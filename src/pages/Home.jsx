import Header from "../components/homePage/Header";
import useSidebarStore from "../stores/common/sidebarStore";
import Sidebar from "../components/homePage/Sidebar";
import Searchbar from "../components/homePage/Searchbar";
import MerchantList from "../components/merchantPage/MerchantList";
import { useEffect, useRef, useState } from "react";

function Home() {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const [showHeader, setShowHeader] = useState(true);
    const scrollableRef = useRef(null);

    useEffect(() => {
        const scrollableEl = scrollableRef.current;
        if (!scrollableEl) return;
        let lastScrollTop = 0;
        const THRESHOLD = 15;
        const handleScroll = () => {
            const currentScrollTop = scrollableEl.scrollTop;
            if (currentScrollTop < 0) {
                return;
            }
            if (currentScrollTop === 0) {
                setShowHeader(true);
                lastScrollTop = 0;
                return;
            }
            const diff = currentScrollTop - lastScrollTop;
            if (diff > THRESHOLD) {
                setShowHeader(false);
                lastScrollTop = currentScrollTop;
            } else if (diff < -THRESHOLD) {
                setShowHeader(true);
                lastScrollTop = currentScrollTop;
            }
        };

        scrollableEl.addEventListener("scroll", handleScroll);

        // cleanup
        return () => {
            scrollableEl.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="flex flex-col h-screen w-dvw overflow-hidden">
            <Header
                title="OrderNow"
                onLeftClick={toggleSidebar}
                className={`
                fixed top-0 z-30 w-full overflow-hidden
                transition-transform duration-300 ease-in-out
                ${showHeader ? "translate-y-0" : "-translate-y-full "}
            `}
            />
            <Sidebar />
            <div className="flex-1 h-dvh overflow-hidden">
                <div
                    className={`
                    fixed left-0 w-full z-20 bg-white transition-all duration-300 pb-5 shadow-sm items-center  ease-in-out
                    ${showHeader ? "top-[46px]" : "top-0"}
                  `}
                >
                    <Searchbar />
                </div>
                <div
                    className={`fixed  w-full left-0 ${showHeader ? "h-[calc(100dvh-120px)]" : "h-[calc(100dvh-80px)]"} transition-all duration-300 overflow-y-auto ${showHeader ? "top-[120px]" : "top-[80px]"} `}
                    ref={scrollableRef}
                >
                    <MerchantList />
                </div>
            </div>
        </div>
    );
}

export default Home;
