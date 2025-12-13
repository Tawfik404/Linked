import { Button } from "@/components/ui/button"
import type { RootState } from "@/config/store";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useRef, useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function HeaderSec() {
    const user = useSelector((state: RootState) => state.user.user);
    const isMobile = useIsMobile();
    const modelRef = useRef(null);
    const [dis, setDis] = useState(false);
    const dispatch = useDispatch();

    return (
        <div className="grid grid-cols-4 w-screen h-15 items-center mb-2" style={{ backgroundColor: user.color, borderBottomLeftRadius: '0.3em', borderBottomRightRadius: '0.3em' }} >
            <h1 className="col-span-1">logo</h1>
            <h1 className="mr-3 col-start-2 col-span-2 text-end " style={{ fontWeight: 600, fontSize: "1.2em" }} ><span style={{ color: "white" }}>{user.firstname}</span>  {user.lastname}</h1>
            {/* <Button className="col-start-4 w-fit" style={{ backgroundColor:"white",color:user.color }}>{isMobile ? '' : 'Log out'} <LogOut /></Button> */}

            <Dialog>
                <DialogTrigger className="col-start-4 w-fit"><Button className="col-start-4 w-fit" style={{ backgroundColor: "white", color: user.color }}>{isMobile ? '' : 'Log out'} <LogOut /></Button>
                </DialogTrigger>
                <DialogContent className="w-fit">
                    <DialogHeader>
                        <DialogTitle className="mb-4">Log out?</DialogTitle>
                        <DialogFooter className="grid grid-cols-2">
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" style={{ backgroundColor: user.color }}
                                onClick={() => {
                                    dispatch({ type: "RESET" });
                                }}
                            >Confirm</Button>
                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>)
}
