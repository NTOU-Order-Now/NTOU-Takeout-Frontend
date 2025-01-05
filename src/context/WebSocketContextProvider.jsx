import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useMemo,
    useState,
} from "react";
import { Client } from "@stomp/stompjs";
import PropTypes from "prop-types";
import { useSystemContext } from "@/context/useSystemContext.jsx";
import { useOrderQueries } from "@/hooks/order/useOrderQueries.jsx";
import { useToast } from "@/hooks/use-toast.js";
import { useQueryClient } from "@tanstack/react-query";
import newOrderNotify from "../assets/newOrderNotify.mp3";
const WebSocketContext = createContext(null);
export const WebSocketContextProvider = ({ children }) => {
    const WebSocket_Url = import.meta.env.VITE_WEBSOCKET_URL;
    const stompClientsRef = useRef(new Map());
    const subscriptionsRef = useRef(new Map());
    const statusMapRef = useRef(new Map()); // track every order's newest status
    const { userInfo } = useSystemContext();
    const role = userInfo?.role;
    const { orders } = useOrderQueries(role === "MERCHANT" ? "PENDING" : "ALL");
    const { toast } = useToast();
    const queryClient = useQueryClient();
    const [isSoundEnabled, setIsSoundEnabled] = useState(false);
    const [isActiveNotifyDialogShow, setIsActiveNotifyDialogShow] =
        useState(true);
    const audioRef = useRef(null);
    const enableSound = useCallback(() => {
        //if is enabled, don't need active again
        if (isSoundEnabled) {
            setIsSoundEnabled(false);
            return;
        }
        setIsActiveNotifyDialogShow(false);
        console.debug("Enable sound");
        const audio = new Audio(newOrderNotify);
        audio
            .play()
            .then(() => {
                audio.currentTime = 0;
                audioRef.current = audio;
                setIsSoundEnabled(true);
            })
            .catch((err) => {
                console.error("Audio play error:", err);
            });
    }, [setIsSoundEnabled, isSoundEnabled]);

    const playSound = useCallback(() => {
        if (isSoundEnabled && audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch((err) => {
                console.error("Failed to play the audio:", err);
            });
        }
    }, [isSoundEnabled]);

    const flatOrders = useMemo(() => {
        if (!orders?.pages) return [];
        return orders.pages
            .flatMap((page) => page.content)
            .filter((order) =>
                role === "MERCHANT"
                    ? order.status === "PENDING"
                    : order.status !== "PICKED_UP" &&
                      order.status !== "CANCELED",
            );
    }, [orders?.pages, role]);
    const getStatusData = (status) => {
        switch (status) {
            case "CANCELED":
                return { customer: "已取消", store: "已取消" };
            case "ACCEPT":
                return { customer: "已接單", store: "已確認接單" };
            case "REJECT":
                return { customer: "店家拒絕接單", store: "已確認拒絕接單" };
            case "PROCESSING":
                return { customer: "店家製作中", store: "已確認開始製作餐點" };
            case "COMPLETED":
                return {
                    customer: "店家製作完成，可以取餐囉~",
                    store: "已確認完成餐點，已通知顧客取餐",
                };
            case "PICKED_UP":
                return { customer: "已取餐", store: "確認顧客完成取餐" };
        }
    };

    const handleStatusChange = useCallback(
        (notification, prevStatus) => {
            // when truly changed that can change
            if (prevStatus !== notification.status && prevStatus !== "") {
                toast({
                    title: `訂單${notification.orderId.slice(-5)} 變更狀態通知`,
                    description: `訂單${notification.orderId.slice(-5)} ${userInfo?.role === "MERCHANT" ? getStatusData(notification.status).store : getStatusData(notification.status).customer}`,
                    className: "bg-sky-400 border-sky-400 font-notoTC",
                });
                //update HistoryOrder page when update
                queryClient.invalidateQueries({ queryKey: ["orders", "ALL"] });
                statusMapRef.current.set(
                    notification.orderId,
                    notification.status,
                );
            }

            if (userInfo?.role === "MERCHANT") {
                playSound();
                toast({
                    title: `您有一筆新訂單`,
                    description: `訂單編號: ${notification.orderId.slice(-5)}`,
                    className: "bg-emerald-500 border-emerald-500 font-notoTC",
                });
                queryClient.invalidateQueries({
                    queryKey: ["orders", "PENDING"],
                });
                statusMapRef.current.set(
                    notification.orderId,
                    notification.status,
                );
            }
        },
        [toast, queryClient, userInfo, playSound],
    );
    const disconnectFromOrder = useCallback((orderId) => {
        const client = stompClientsRef.current.get(orderId);
        const subscription = subscriptionsRef.current.get(orderId);

        if (subscription) {
            subscription.unsubscribe();
            subscriptionsRef.current.delete(orderId);
        }

        if (client) {
            client.deactivate();
            stompClientsRef.current.delete(orderId);
            statusMapRef.current.delete(orderId);
        }
    }, []);
    const connectToOrder = useCallback(
        (id, currentStatus) => {
            //check reconnect
            if (
                stompClientsRef.current.has(id) &&
                statusMapRef.current.get(id) === currentStatus
            ) {
                return;
            }

            // disconnect old connect
            if (stompClientsRef.current.has(id)) {
                disconnectFromOrder(id);
            }

            // init statusMapRef
            statusMapRef.current.set(id, currentStatus);

            const client = new Client({
                brokerURL: WebSocket_Url,
            });

            client.onConnect = () => {
                const subscription = client.subscribe(
                    `/topic/order/${id}`,

                    (message) => {
                        const notification = JSON.parse(message.body);
                        const prevStatus = statusMapRef.current.get(id);
                        handleStatusChange(notification, prevStatus);
                    },
                );
                if (userInfo?.role === "MERCHANT") {
                    const subscription = client.subscribe(
                        `/topic/order/send/${id}`,
                        (message) => {
                            const notification = JSON.parse(message.body);
                            const prevStatus = statusMapRef.current.get(id);
                            handleStatusChange(notification, prevStatus);
                        },
                    );
                    subscriptionsRef.current.set(id, subscription);
                }

                subscriptionsRef.current.set(id, subscription);
                // client.publish({
                //     destination: `/app/order-tracker/${orderId}`,
                //     body: JSON.stringify({ orderId }),
                // });
            };

            client.onStompError = (frame) => {
                console.error(
                    `Error for order ${id}:`,
                    frame.headers["message"],
                );
            };

            client.activate();
            stompClientsRef.current.set(id, client);
        },
        [handleStatusChange, disconnectFromOrder, userInfo, WebSocket_Url],
    );

    // loop all socket client
    useEffect(() => {
        //disconnect exist connect
        stompClientsRef.current.forEach((_, orderId) => {
            if (!flatOrders.find((order) => order.id === orderId)) {
                disconnectFromOrder(orderId);
            }
        });

        //establish new connect
        flatOrders.forEach((order) => {
            connectToOrder(order.id, order.status);
        });

        if (userInfo?.role === "MERCHANT") {
            connectToOrder(userInfo?.storeId, "");
        }

        const currentStompClientRef = stompClientsRef.current;
        //call back disconnect all
        return () => {
            currentStompClientRef.forEach((_, orderId) => {
                disconnectFromOrder(orderId);
            });
        };
    }, [
        flatOrders,
        connectToOrder,
        disconnectFromOrder,
        userInfo,
        isActiveNotifyDialogShow,
    ]);

    return (
        <WebSocketContext.Provider
            value={{
                stompClientsRef,
                subscriptionsRef,
                enableSound,
                isSoundEnabled,
                isActiveNotifyDialogShow,
                setIsActiveNotifyDialogShow,
            }}
        >
            {children}
        </WebSocketContext.Provider>
    );
};

WebSocketContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useWebSocketContext = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("useWebSocket must be used within a WebSocketProvider");
    }
    return context;
};
