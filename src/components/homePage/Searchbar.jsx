import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircle,
    faFilter,
    faSearch,
} from "@fortawesome/free-solid-svg-icons";
import useSelectionStore from "../../stores/selectionStore";
import SearchSelectionBar from "./SearchSelectionBar";

const Searchbar = () => {
    const showSelectionBar = useSelectionStore(
        (state) => state.showSelectionBar,
    );
    const setShowSelectionBar = useSelectionStore(
        (state) => state.setShowSelectionBar,
    );
    const selectedSortBy = useSelectionStore((state) => state.selectedSortBy);
    const selectedSortDir = useSelectionStore((state) => state.selectedSortDir);
    const selectedKeyword = useSelectionStore((state) => state.selectedKeyword);
    const setSelectedSortBy = useSelectionStore(
        (state) => state.setSelectedSortBy,
    );
    const setSelectedSortDir = useSelectionStore(
        (state) => state.setSelectedSortDir,
    );
    const setSelectedKeyword = useSelectionStore(
        (state) => state.setSelectedKeyword,
    );
    const setIsSubmitted = useSelectionStore((state) => state.setIsSubmitted);

    useEffect(() => {
        const storedSortBy = localStorage.getItem("selectedSortBy");
        const storedSortDir = localStorage.getItem("selectedSortDir");
        const storedKeyword = localStorage.getItem("selectedKeyword");
        if (storedSortBy === "null")
            localStorage.setItem("selectedSortBy", "rating");
        if (storedSortDir === "null")
            localStorage.setItem("selectedSortDir", "desc");
        if (storedKeyword === "null")
            localStorage.setItem("selectedKeyword", "");
        if (storedSortBy) setSelectedSortBy(storedSortBy);
        else setSelectedSortBy("rating");
        if (storedSortDir) setSelectedSortDir(storedSortDir);
        else setSelectedSortDir("desc");
        if (storedKeyword) setSelectedKeyword(storedKeyword);
        else setSelectedKeyword("");
    }, [setSelectedKeyword, setSelectedSortBy, setSelectedSortDir]);

    useEffect(() => {
        localStorage.setItem("selectedSortBy", selectedSortBy);
        localStorage.setItem("selectedSortDir", selectedSortDir);
        localStorage.setItem("selectedKeyword", selectedKeyword);
    }, [selectedSortBy, selectedSortDir, selectedKeyword]);

    const [inputValue, setInputValue] = useState(
        localStorage.getItem("selectedKeyword"),
    );
    const toggleSelectionBar = () => {
        setShowSelectionBar(!showSelectionBar);
    };

    const handleSubmit = () => {
        const keyword = document.getElementById("inputKeyword").value;
        // console.log("trigger");

        setInputValue(keyword);
        setSelectedKeyword(keyword);
        setIsSubmitted(true);
        setShowSelectionBar(false);
    };
    const handleEnter = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
            event.preventDefault();
        }
    };

    return (
        <div className="font-notoTC flex flex-col items-center w-full max-w-[800px] my-5 mx-auto box-border">
            <div className="flex items-center justify-between w-full px-2">
                <div
                    className="relative text-2xl flex items-center justify-center cursor-pointer"
                    onClick={toggleSelectionBar}
                >
                    <FontAwesomeIcon icon={faFilter} />
                    {!(selectedSortBy === "" && selectedSortDir === "") && (
                        <div className="absolute -top-[17px] right-[-4px] z-45">
                            <FontAwesomeIcon
                                icon={faCircle}
                                className="w-3"
                                style={{ color: "#ff0a0a" }}
                            />
                        </div>
                    )}
                </div>
                <input
                    type="text"
                    className="flex-grow mx-2 border-b-2 border-black outline-none text-lg py-1"
                    placeholder="想吃什麼..."
                    id="inputKeyword"
                    onKeyDown={handleEnter}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <div
                    className="text-2xl flex items-center justify-center cursor-pointer"
                    onClick={handleSubmit}
                >
                    <FontAwesomeIcon icon={faSearch} />
                </div>
            </div>

            {showSelectionBar && <SearchSelectionBar></SearchSelectionBar>}
        </div>
    );
};

export default Searchbar;
