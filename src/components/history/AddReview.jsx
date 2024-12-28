import PropTypes from "prop-types";
import ReviewForm from "../orderPage/ReviewForm.jsx";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import NormalHeader from "../common/NormalHeader.jsx";
import useReviewForm from "../../stores/review/AddReviewStore.js";
import { useReviewMutation } from "../../hooks/review/useReviewMutation.jsx";
import { useCallback, useEffect } from "react";
import { useToast } from "@/hooks/use-toast.js";
import { ToastAction } from "@/components/ui/toast.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Loader2 } from "lucide-react";

const AddReview = ({ storeName, storeId, setShowAddReview }) => {
    const title = `對 ${storeName} 新增評論`;
    const { storeDescription, storeAverageSpend, storeRating, reset } =
        useReviewForm();
    const { addReview, isPending, isSuccess } = useReviewMutation(storeId);
    const handleReturn = useCallback(() => {
        setShowAddReview(false);
    }, [setShowAddReview]);
    const { toast } = useToast();

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: "成功",
                description: "已成功送出評論",
                action: (
                    <ToastAction
                        altText="回訂單"
                        onClick={() => handleReturn()}
                    >
                        回歷史訂單
                    </ToastAction>
                ),
            });
        }
    }, [isSuccess, toast, handleReturn]);

    let errorText = "";
    const validateForm = () => {
        if (!storeDescription?.trim()) {
            errorText = "請填寫評論內容";
            return false;
        }
        if (!storeAverageSpend) {
            errorText = "請填寫平均消費";
            return false;
        }
        if (!storeRating) {
            errorText = "請填寫評分";
            return false;
        }
        errorText = "";
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            toast({
                title: "失敗",
                description: errorText,
                variant: "destructive",
            });
            return;
        }

        const payload = {
            averageSpend: storeAverageSpend,
            comment: storeDescription.trim(),
            rating: storeRating,
        };
        reset();
        try {
            await addReview({ payload });
        } catch {
            toast({
                title: "失敗",
                description: "發生未預期錯誤，請重新整理再嘗試",
                variant: "destructive",
            });
        }
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden">
            <NormalHeader
                title={title}
                onLeftClick={handleReturn}
                leftIcon={faArrowLeft}
                handleClick={handleReturn}
            />
            <div className="flex-1 overflow-hidden">
                <div className="sticky top-[54px] mt-[54px] z-20 ">
                    <ReviewForm />
                    <div className="flex items-center w-full">
                        <Button
                            className="font-notoTC m-4 rounded-xl text-white text-lg fixed bottom-4 w-[80%] h-12 p-4 flex justify-center items-center shadow-md cursor-pointer mx-auto left-0 right-0"
                            onClick={(e) => {
                                handleSubmit(e);
                            }}
                        >
                            {isPending && <Loader2 className="animate-spin" />}
                            提交
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

AddReview.propTypes = {
    storeName: PropTypes.string,
    storeId: PropTypes.string,
    setShowAddReview: PropTypes.func,
};

export default AddReview;
