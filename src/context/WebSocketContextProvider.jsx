import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useMemo,
} from "react";
import { Client } from "@stomp/stompjs";
import PropTypes from "prop-types";
import { useSystemContext } from "@/context/useSystemContext.jsx";
import { useOrderQueries } from "@/hooks/order/useOrderQueries.jsx";
import { useToast } from "@/hooks/use-toast.js";
import { useQueryClient } from "@tanstack/react-query";

const WebSocketContext = createContext(null);
const WebSocket_Url = import.meta.env.VITE_WEBSOCKET_URL;

export const WebSocketContextProvider = ({ children }) => {
    console.debug("WebSocketContextProvider mounted");
    const stompClientsRef = useRef(new Map());
    const subscriptionsRef = useRef(new Map());
    const statusMapRef = useRef(new Map()); // track every order's newest status
    const { userInfo } = useSystemContext();
    const role = userInfo?.role;
    const { orders } = useOrderQueries(role === "MERCHANT" ? "PENDING" : "ALL");
    const { toast } = useToast();
    console.debug("WebSocket_Url:", WebSocket_Url);
    const queryClient = useQueryClient();

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

    const handleStatusChange = useCallback(
        (notification, prevStatus) => {
            // when truly changed that can change
            if (prevStatus !== notification.status) {
                toast({
                    title: `訂單${notification.orderId.slice(-5)}變更狀態`,
                    description: `訂單${notification.orderId.slice(-5)}狀態變更為${notification.status}`,
                });
                //update HistoryOrder page when update
                queryClient.invalidateQueries({ queryKey: ["orders", "ALL"] });
                statusMapRef.current.set(
                    notification.orderId,
                    notification.status,
                );
            }
        },
        [toast, queryClient],
    );
    const disconnectFromOrder = useCallback((orderId) => {
        const client = stompClientsRef.current.get(orderId);
        const subscription = subscriptionsRef.current.get(orderId);

        if (subscription) {
            subscription.unsubscribe();
            subscriptionsRef.current.delete(orderId);
            // console.debug(`${orderId} subscription was disconnected`);
        }

        if (client) {
            client.deactivate();
            stompClientsRef.current.delete(orderId);
            statusMapRef.current.delete(orderId);
            // console.debug(`${orderId} disconnected`);
        }
    }, []);
    const connectToOrder = useCallback(
        (orderId, currentStatus) => {
            //check reconnect
            if (
                stompClientsRef.current.has(orderId) &&
                statusMapRef.current.get(orderId) === currentStatus
            ) {
                return;
            }

            // disconnect old connect
            if (stompClientsRef.current.has(orderId)) {
                disconnectFromOrder(orderId);
            }

            // init statusMapRef
            statusMapRef.current.set(orderId, currentStatus);

            const client = new Client({
                brokerURL: WebSocket_Url,
            });

            client.onConnect = () => {
                // console.debug(`Connected to order ${orderId}`);
                const subscription = client.subscribe(
                    `/topic/order/${orderId}`,
                    (message) => {
                        const notification = JSON.parse(message.body);
                        const prevStatus = statusMapRef.current.get(orderId);
                        handleStatusChange(notification, prevStatus);
                    },
                );

                subscriptionsRef.current.set(orderId, subscription);
                // client.publish({
                //     destination: `/app/order-tracker/${orderId}`,
                //     body: JSON.stringify({ orderId }),
                // });
            };

            client.onStompError = (frame) => {
                console.error(
                    `Error for order ${orderId}:`,
                    frame.headers["message"],
                );
            };

            client.activate();
            stompClientsRef.current.set(orderId, client);
        },
        [handleStatusChange, disconnectFromOrder],
    );

    // loop all socket client
    useEffect(() => {
        if (!flatOrders.length) return;

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
        const currentStompClientRef = stompClientsRef.current;
        //call back disconnect all
        return () => {
            currentStompClientRef.forEach((_, orderId) => {
                disconnectFromOrder(orderId);
            });
        };
    }, [flatOrders, connectToOrder, disconnectFromOrder]);

    return (
        <WebSocketContext.Provider
            value={{ stompClientsRef, subscriptionsRef }}
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
