import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import PropTypes from "prop-types";
import { Bell } from "lucide-react";
import { useWebSocketContext } from "@/context/WebSocketContextProvider.jsx";
const ActiveNotifyDialog = () => {
    const { enableSound, isSoundEnabled } = useWebSocketContext();
    return (
        <Dialog defaultOpen={true}>
            <DialogTrigger asChild>
                <button
                    className={`${isSoundEnabled ? "bg-green-500" : "bg-gray-500"} text-white rounded-lg px-3 py-1 font-sm shadow-md`}
                    onClick={() => enableSound()}
                >
                    <Bell size={22} />
                </button>
            </DialogTrigger>
            <DialogContent className="w-3/4">
                <DialogHeader>
                    <DialogTitle>您未開啟訂單通知鈴聲，是否要開啟?</DialogTitle>
                    <DialogDescription>
                        若沒開啟鈴聲，新訂單進來時將無通知音效
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            onClick={() => {
                                enableSound();
                            }}
                        >
                            確定
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
ActiveNotifyDialog.propTypes = {
    isOpen: PropTypes.bool,
};
export default ActiveNotifyDialog;
