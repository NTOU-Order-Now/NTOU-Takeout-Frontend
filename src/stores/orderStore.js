import { create } from "zustand";

const useOrderStore = create((set) => ({
    orderData: null,
    setOrderData: (order) => set({ orderData: order }),
    updateOrderStatus: (orderId, newStatus) =>
        set((state) => ({
            orders: state.orders.map((order) =>
                order.id === orderId ? { ...order, status: newStatus } : order,
            ),
        })),
    acceptOrder: (orderId) =>
        set((state) => ({
            orders: state.orders.map((order) =>
                order.id === orderId
                    ? {
                          ...order,
                          status: "PROCESSING",
                          acceptTime: new Date()
                              .toISOString()
                              .replace("T", " ")
                              .slice(0, 19), // 更新接受時間
                      }
                    : order,
            ),
        })),
    denyOrder: (orderId) =>
        set((state) => ({
            orders: state.orders.map((order) =>
                order.id === orderId ? { ...order, status: "CANCELED" } : order,
            ),
        })),
}));

export default useOrderStore;
