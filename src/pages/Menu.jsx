import { useParams } from "react-router-dom";
import { useRef, useState, useEffect, lazy, Suspense } from "react";
import { useCategoryQueries } from "../hooks/menu/useCategoryQueries";
import { useCategoryListQuery } from "../hooks/menu/useCategoryListQuery";
import useNavStore from "../stores/merchantMenuNav";
import MenuPageSkeleton from "../skeleton/menu/MenuPageSkeleton.jsx";
import { useStoreQuery } from "@/hooks/store/useStoreQuery.jsx";
const NavbarSkeleton = lazy(() => import("../skeleton/menu/NavbarSkeleton"));
const MenuHeaderSkeleton = lazy(
    () => import("../skeleton/menu/MenuHeaderSkeleton"),
);
const ViewCartButtonSkeleton = lazy(
    () => import("../skeleton/menu/ViewCartButtonSkeleton"),
);
const MenuSectionSkeleton = lazy(
    () => import("../skeleton/menu/MenuSectionSkeleton"),
);
const MenuHeader = lazy(() => import("../components/merchantPage/MenuHeader"));
const MenuNavbar = lazy(() => import("../components/merchantPage/MenuNavbar"));
const MenuSection = lazy(
    () => import("../components/merchantPage/MenuSection"),
);
const ViewCartButton = lazy(
    () => import("../components/merchantPage/ViewCartButton"),
);

function Menu() {
    const { merchantId } = useParams();
    const sectionRefs = useRef([]);
    const [isNavbarFixed, setIsNavbarFixed] = useState(false);
    const setNavbarItems = useNavStore((state) => state.setNavbarItems);
    const { storeData, isLoading, isError } = useStoreQuery([merchantId]);
    const { menuCategoryList } = useCategoryListQuery(storeData?.[0].menuId);
    const { categoryData } = useCategoryQueries(
        menuCategoryList,
        storeData?.[0].menuId,
    );
    const [selectedDish, setSelectedDish] = useState(null);

    // handle scroll to section
    const handleScrollToSection = (index) => {
        sectionRefs.current[index]?.scrollIntoView({
            behavior: "smooth",
            inline: "start",
        });
    };

    // listen for dertermine if navbar is fixed
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsNavbarFixed(scrollPosition > 260);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // set navbar items
    useEffect(() => {
        setNavbarItems(
            menuCategoryList.map((category) => category.categoryName),
        );
    }, [menuCategoryList, setNavbarItems]);

    if (isLoading && !storeData) {
        return <MenuPageSkeleton />;
    }
    return (
        <div className="flex flex-col ">
            <Suspense fallback={<MenuHeaderSkeleton />}>
                <MenuHeader merchantData={storeData?.[0]} />
            </Suspense>
            <Suspense fallback={<NavbarSkeleton isNavbarFixed={false} />}>
                <MenuNavbar
                    onNavClick={handleScrollToSection}
                    isNavbarFixed={isNavbarFixed}
                />
            </Suspense>
            <Suspense fallback={<MenuSectionSkeleton />}>
                <MenuSection
                    selectedDish={selectedDish}
                    setSelectedDish={setSelectedDish}
                    sectionRefs={sectionRefs}
                    categoryData={categoryData}
                />
            </Suspense>
            {selectedDish == null && (
                <Suspense fallback={<ViewCartButtonSkeleton />}>
                    <ViewCartButton />
                </Suspense>
            )}
        </div>
    );
}

export default Menu;
