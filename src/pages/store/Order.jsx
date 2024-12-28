import { useState } from "react";
import Header from "../../components/storePage/home/Header";
import useSidebarStore from "../../stores/common/sidebarStore";
import UnacceptedList from "../../components/storePage/management/order/UnacceptedList.jsx";
import AcceptedList from "../../components/storePage/management/order/AcceptedList.jsx";
import ToggleNavBar from "../../components/common/ToggleNavBar.jsx";
import { useQueryClient } from "@tanstack/react-query";

const Order = () => {
    const queryClient = useQueryClient();
    const orderCount = queryClient.getQueryData(["order", "PENDING"]);
    const [navBarStatus, setNavBarStatus] = useState(0);
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const title = useSidebarStore((state) => state.title);
    const orderCountButton = (
        <button
            onClick={() => {
                console.debug("orderCountButton click");
            }}
            className=" bg-orange-500 text-white rounded-lg px-3 py-1 font-sm shadow-md"
        >
            共計 {orderCount} 筆訂單
        </button>
    );

    const handleToUnaccepted = () => {
        setNavBarStatus(0);
        console.debug("handleToUnaccepted");
    };
    const handleToAccepted = () => {
        setNavBarStatus(1);
        console.debug("handleToAccepted");
    };
    const options = {
        未接受: handleToUnaccepted,
        已接受: handleToAccepted,
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <Header
                title={title}
                onLeftClick={toggleSidebar}
                // rightComponents={[orderCountButton]}
            />
            <div className="flex-1 overflow-hidden">
                <div className="sticky top-[50px] mt-[50px] z-20 px-10 py-1  h-[85px] bg-white content-center rounded-b-xl shadow-sm ">
                    <ToggleNavBar options={options} InitActiveTab={"未接受"} />
                </div>
                <div className="h-[calc(100dvh-189px)] overflow-y-auto px-8 py-2">
                    {navBarStatus === 0 ? <UnacceptedList /> : <AcceptedList />}
                </div>
            </div>
        </div>
    );
};

export default Order;
