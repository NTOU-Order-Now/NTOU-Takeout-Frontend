import { Search } from "lucide-react";
import filterStoreDataStore from "@/stores/filterStoreDataStore.js";
import { FilterDrawer } from "@/components/homePage/FilterDrawer.jsx";
const Searchbar = () => {
    const { isOpen, setIsOpen, setKeyword, keyword } = filterStoreDataStore();

    const handleSubmit = () => {
        console.debug("keyword:", keyword);
    };
    const handleEnter = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
            event.preventDefault();
        }
    };
    return (
        <div className="font-notoTC flex flex-row items-center w-full  mt-5 px-5 ">
            <div className="bg-zinc-100 flex flex-row items-center w-full px-3 rounded-xl shadow-md h-9">
                <div>
                    <Search strokeWidth={3} size={18} color={"#52525b"} />
                </div>

                <input
                    type="text"
                    className="w-full mx-2 text-gray-500 outline-none text-[15px] py-1 bg-zinc-100"
                    placeholder="搜尋想找的店家"
                    id="inputKeyword"
                    onKeyDown={handleEnter}
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                    className="rounded-lg w-10 h-6 justify-center flex items-center hover:bg-zinc-300"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FilterDrawer />
                </button>
            </div>
        </div>
    );
};

export default Searchbar;
