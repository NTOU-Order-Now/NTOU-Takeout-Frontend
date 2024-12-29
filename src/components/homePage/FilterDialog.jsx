import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

import filterStoreDataStore from "@/stores/filterStoreDataStore.js";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

export function FilterDialog() {
    // const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const { sortBy, sortDir, setSortBy, setSortDir } = filterStoreDataStore();
    const [selectedSortBy, setSelectedSortBy] = useState(sortBy);
    const [selectedSortDir, setSelectedSortDir] = useState(sortDir);
    const handleSortByClick = (value) => {
        setSelectedSortBy(value);
    };
    const handleSortDirClick = (value) => {
        setSelectedSortDir(value);
    };

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <SlidersHorizontal
                    strokeWidth={2}
                    size={18}
                    className="text-zinc-500"
                />
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>篩選店家</DrawerTitle>
                    <DrawerDescription>
                        預設為由評分由高至低排序
                    </DrawerDescription>
                </DrawerHeader>
                <div className="flex justify-around w-full font-notoTC py-4">
                    <div className="flex flex-col w-[40%]">
                        <p className="text-sm">篩選根據</p>
                        <label className="mt-2 flex justify-between items-center cursor-pointer">
                            評價 (預設)
                            <input
                                type="radio"
                                checked={selectedSortBy === "rating"}
                                onChange={() => handleSortByClick("rating")}
                                className="appearance-none w-4 h-4 border-2 border-black rounded-full checked:bg-zinc-500 checked:border-zinc-600"
                                name="sortBy"
                                required
                            />
                        </label>
                        <label className="mt-2 flex justify-between items-center cursor-pointer">
                            平均花費
                            <input
                                type="radio"
                                checked={selectedSortBy === "averageSpend"}
                                onChange={() =>
                                    handleSortByClick("averageSpend")
                                }
                                className="appearance-none w-4 h-4 border-2 border-black rounded-full checked:bg-zinc-500 checked:border-zinc-600"
                                name="sortBy"
                                required
                            />
                        </label>
                    </div>
                    <div className="flex flex-col w-[40%]">
                        <p className="text-sm">排序</p>
                        <label className="mt-2 flex justify-between items-center cursor-pointer">
                            由高到低 (預設)
                            <input
                                type="radio"
                                checked={selectedSortDir === "desc"}
                                onChange={() => handleSortDirClick("desc")}
                                className="appearance-none w-4 h-4 border-2 border-black rounded-full checked:bg-zinc-500 checked:border-zinc-600"
                                name="sortDir"
                                required
                            />
                        </label>
                        <label className="mt-2 flex justify-between items-center cursor-pointer">
                            由低到高
                            <input
                                type="radio"
                                checked={selectedSortDir === "asc"}
                                onChange={() => handleSortDirClick("asc")}
                                className="appearance-none w-4 h-4 border-2 border-black rounded-full checked:bg-zinc-500 checked:border-zinc-600"
                                name="sortDir"
                                required
                            />
                        </label>
                    </div>
                </div>
                <DrawerFooter className="pt-2">
                    <DrawerClose
                        asChild
                        onClick={() => {
                            setSortBy(selectedSortBy);
                            setSortDir(selectedSortDir);
                        }}
                    >
                        <Button className="font-notoTC">確定</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
