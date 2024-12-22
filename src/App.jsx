import { StrictMode, useEffect, lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SystemContextProvider } from "./context/SystemContextProvider.jsx";
import NotFound from "./pages/NotFound";
import CartSkeleton from "./skeleton/cart/CartSkeleton";
import HomeSkeleton from "./skeleton/home/HomeSkeleton";
import ReviewSkeleton from "./skeleton/review/ReviewSkeleton";
import MenuPageSkeleton from "./skeleton/menu/MenuPageSkeleton.jsx";
import LoginRegisterSkeleton from "./skeleton/auth/LoginRegisterSkeleton";
const Cart = lazy(() => import("./pages/Cart"));
const Home = lazy(() => import("./pages/Home"));
const Review = lazy(() => import("./pages/Review"));
const Menu = lazy(() => import("./pages/Menu"));
const LoginRegister = lazy(() => import("./pages/LoginRegister"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const Verify = lazy(() => import("./pages/Verify.jsx"));
const MerchantRegister = lazy(() => import("./pages/MerchantRegister"));
const StoreHome = lazy(() => import("./pages/store/Home"));
const StoreMenu = lazy(() => import("./pages/store/Menu"));
const StoreOrder = lazy(() => import("./pages/store/Order"));
const queryClient = new QueryClient();
import OrderDetails from "./pages/store/OrderDetailPage";
import MerchantProtectedRoute from "./route/MerchantProtectedRoute.jsx";
import CustomerProtectedRoute from "./route/CustomerProtectedRoute.jsx";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: (
                <Suspense fallback={<HomeSkeleton />}>
                    <Home />
                </Suspense>
            ),
            errorElement: <NotFound />,
        },
        {
            path: "/cart",
            element: (
                <Suspense fallback={<CartSkeleton />}>
                    <CustomerProtectedRoute>
                        <Cart />
                    </CustomerProtectedRoute>
                </Suspense>
            ),
            errorElement: <NotFound />,
        },
        {
            path: "/menu/:merchantId",
            element: (
                <Suspense fallback={<MenuPageSkeleton />}>
                    <Menu />
                </Suspense>
            ),
            errorElement: <NotFound />,
        },
        {
            path: "/menu/:merchantId/review",
            element: (
                <Suspense fallback={<ReviewSkeleton />}>
                    <Review />
                </Suspense>
            ),
            errorElement: <NotFound />,
        },
        {
            path: "/auth/:authType",
            element: (
                <Suspense fallback={<LoginRegisterSkeleton />}>
                    <LoginRegister />
                </Suspense>
            ),
            errorElement: <NotFound />,
        },
        {
            path: "/auth/reset/password",
            element: (
                <Suspense fallback={LoginRegisterSkeleton}>
                    <ForgetPassword />
                </Suspense>
            ),
            errorElement: <NotFound />,
        },
        {
            path: "/auth/Verify",
            element: (
                <Suspense fallback={LoginRegisterSkeleton}>
                    <Verify />
                </Suspense>
            ),
            errorElement: <NotFound />,
        },
        {
            path: "/auth/register/merchant",
            element: (
                <Suspense fallback={LoginRegisterSkeleton}>
                    <MerchantRegister />
                </Suspense>
            ),
            errorElement: <NotFound />,
        },
        {
            path: "/store/pos",
            element: (
                <Suspense fallback={<HomeSkeleton />}>
                    <MerchantProtectedRoute>
                        <StoreHome />
                    </MerchantProtectedRoute>
                </Suspense>
            ),
            errorElement: <NotFound />,
            children: [
                {
                    path: "management/menu",
                    element: (
                        <Suspense fallback={<MenuPageSkeleton />}>
                            <StoreMenu />
                        </Suspense>
                    ),
                    errorElement: <NotFound />,
                },
                {
                    path: "management/order",
                    element: (
                        <Suspense fallback={<MenuPageSkeleton />}>
                            <StoreOrder />
                        </Suspense>
                    ),
                    errorElement: <NotFound />,
                },
            ],
        },
        {
            path: "/OrderDetails",
            element: <OrderDetails />,
            // errorElement: <NotFound />,
        },
    ],
    {
        basename: "/Order-Now-Frontend/",
    },
);

function App() {
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const redirectPath = searchParams.get("redirect");
        if (redirectPath) {
            router.navigate(redirectPath, { replace: true });
        }
    }, []);
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <SystemContextProvider>
                    <RouterProvider router={router}></RouterProvider>
                </SystemContextProvider>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </StrictMode>
    );
}

export default App;
