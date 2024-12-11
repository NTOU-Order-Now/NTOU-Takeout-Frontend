import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Review from "./pages/Review";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import MerchantPage from "./pages/MerchantPage";
import MerchantMainPage from "./pages/MerchantSubpage/MerchantMainPage";
import MerchantMenuPage from "./pages/MerchantSubpage/MerchantMenuPage";
import MerchantOrderPage from "./pages/MerchantSubpage/MerchantOrderPage";

const queryClient = new QueryClient();
const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        errorElement: <NotFound />,
    },
    {
        path: "/cart",
        element: <Cart />,
        errorElement: <NotFound />,
    },
    {
        path: "/menu/:merchantId",
        element: <Menu />,
        errorElement: <NotFound />,
    },
    {
        path: "/menu/:merchantId/review",
        element: <Review />,
        errorElement: <NotFound />,
    },
    {
        path: "/merchantPage",
        element: <MerchantPage />,
        errorElement: <NotFound />,
        children: [
            {
                path: "", // 子路由
                element: <MerchantMainPage />,
                errorElement: <NotFound />,
            },
            {
                path: "menu", // 子路由
                element: <MerchantMenuPage />,
                errorElement: <NotFound />,
            },
            {
                path: "order", // 子路由
                element: <MerchantOrderPage />,
                errorElement: <NotFound />,
            },
        ],
    },
]);

function App() {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router}></RouterProvider>
            </QueryClientProvider>
        </StrictMode>
    );
}

export default App;
