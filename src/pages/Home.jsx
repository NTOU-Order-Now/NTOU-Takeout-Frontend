import Header from "../components/homePage/Header";
import useSidebarStore from "../stores/common/sidebarStore";
import Sidebar from "../components/homePage/Sidebar";
import Searchbar from "../components/homePage/Searchbar";
import MerchantList from "../components/merchantPage/MerchantList";

function Home() {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);

    return (
        <div>
            <Header
                title="OrderNow 馬上點"
                onLeftClick={toggleSidebar}
                className="fixed top-0"
            />
            <div className="py-5"></div>
            <Sidebar></Sidebar>
            <Searchbar></Searchbar>
            <MerchantList></MerchantList>
        </div>
    );
}

export default Home;
