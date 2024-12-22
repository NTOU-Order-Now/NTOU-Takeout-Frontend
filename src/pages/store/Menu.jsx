import { lazy, Suspense, useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import useSidebarStore from "../../stores/common/sidebarStore";
import Header from "../../components/storePage/home/Header";
import NavbarSkeleton from "../../skeleton/menu/NavbarSkeleton";
import MenuSectionSkeleton from "../../skeleton/menu/MenuSectionSkeleton";
const MenuNavbar = lazy(
    () => import("../../components/merchantPage/MenuNavbar"),
);
const MenuSection = lazy(
    () => import("../../components/storePage/management/menu/MenuSection"),
);
import { useCategoryQueries } from "../../hooks/menu/useCategoryQueries";
import useNavStore from "../../stores/merchantMenuNav";
import DishEdit from "../../components/storePage/management/menu/editPage/DishEdit";
import MenuPageSkeleton from "../../skeleton/menu/MenuPageSkeleton.jsx";
import { useSystemContext } from "../../context/useSystemContext.jsx";
import { useCreateDishMutation } from "../../hooks/store/useCreateDishMutation.jsx";

const Menu = () => {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const title = useSidebarStore((state) => state.title);
    const { userInfo, merchantData, menuCategoryList } = useSystemContext();
    // console.debug("merchantData", merchantData);
    // console.debug("menuCategoryList", menuCategoryList);
    const merchantId = userInfo?.id;
    const menuId = merchantData?.menuId;
    // console.debug("merchantId:", merchantId);
    const { categoryData } = useCategoryQueries(
        menuCategoryList,
        merchantData?.menuId,
        userInfo !== undefined,
    );

    // console.debug("categoryData", categoryData);
    const sectionRefs = useRef([]);
    const [isNavbarFixed, setIsNavbarFixed] = useState(false);
    const setNavbarItems = useNavStore((state) => state.setNavbarItems);
    const { createDish, isPending: isCreatePenging } =
        useCreateDishMutation(menuId);

    // handle scroll to section
    const handleScrollToSection = (index) => {
        sectionRefs.current[index]?.scrollIntoView({
            behavior: "smooth",
            inline: "start",
        });
    };

    // const categoryData = useMenuStore((state) => state.menu.categories);
    const [selectedDish, setSelectedDish] = useState(null);

    // set navbar items
    useEffect(() => {
        if (menuCategoryList?.length) {
            setNavbarItems(
                menuCategoryList.map((category) => category.categoryName),
            );
        }
    }, [menuCategoryList, setNavbarItems]);

    // if merchant data is not fetched yet, show loading spinner
    if (merchantId && !merchantData) {
        return <MenuPageSkeleton />;
    }
    const onAddClick = async () => {
        await createDish();
    };
    const addButton = (
        <button
            onClick={onAddClick}
            className="bg-orange-500 text-white rounded-lg p-2 flex  shadow-md content-center w-full h-full"
        >
            {isCreatePenging ? (
                <FontAwesomeIcon
                    icon={faSpinner}
                    spinPulse
                    style={{ color: "#ffffff" }}
                    size="xs"
                />
            ) : (
                <FontAwesomeIcon icon={faPlus} />
            )}
        </button>
    );
    const previewButton = (
        <button
            onClick={() => {
                console.debug("preview click");
            }}
            className=" bg-slate-400 text-white rounded-lg px-3 py-1 font-sm shadow-md"
        >
            預覽
        </button>
    );
    const handleUpdate = (newDish) => {
        console.log(newDish, "!!!");
        setSelectedDish(null);
    };

    // 取得 categoryNames
    const categoryNames = categoryData.map((category) => category.name);

    if (selectedDish) {
        return (
            <DishEdit
                dishData={selectedDish}
                categoryNames={categoryNames}
                selectCategory={selectedDish.category}
                onClose={(dish) => handleUpdate(dish)}
            />
        );
    }

    return (
        <div>
            <Header
                title={title}
                onLeftClick={toggleSidebar}
                rightComponents={[addButton, previewButton]}
            />
            <div className="sticky top-[56px] z-20">
                <Suspense fallback={<NavbarSkeleton isNavbarFixed={false} />}>
                    <MenuNavbar
                        onNavClick={handleScrollToSection}
                        isNavbarFixed={isNavbarFixed}
                    />
                </Suspense>
            </div>
            <div className=" relative top-10">
                <Suspense fallback={<MenuSectionSkeleton />}>
                    <MenuSection
                        menuId={menuId}
                        sectionRefs={sectionRefs}
                        categoryData={categoryData}
                    />
                </Suspense>
            </div>
        </div>
    );
};

export default Menu;
