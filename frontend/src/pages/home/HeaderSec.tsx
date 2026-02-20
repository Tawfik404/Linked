import { Button } from "@/components/ui/button"
import type { RootState } from "@/config/store";
import { useDispatch, useSelector } from "react-redux";
import { LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import logo from '@/assets/logo2.png';
export default function HeaderSec() {
    const user = useSelector((state: RootState) => state.user.user);
    const isMobile = useIsMobile();
    const dispatch = useDispatch();

    return (
        <div className="grid grid-cols-4 w-full h-15 items-center mb-2 mt-0.5" style={{
            backgroundColor: user.color,
            borderRadius:"50px"
        }} >
            <div className="flex flex-row">
            <img className="col-span-1 w-10 ml-3" src={logo} alt="Logo" />
                <h1 className="content-center ml-3"  style={{ fontWeight: 600, fontSize: "1.5em",color:"white" }}>
                    {isMobile ? '' : 'Linked'}
                </h1>
            </div>
            {/* <Button className="col-start-4 w-fit" style={{ backgroundColor:"white",color:user.color }}>{isMobile ? '' : 'Log out'} <LogOut /></Button> */}
            
            <h1 className="mr-3 col-start-2 col-span-2 text-center " style={{ fontWeight: 600, fontSize: "1.2em" }} ><span style={{ color: "white" }}>{user.firstname}</span>  {user.lastname}</h1>
            <Dialog>
                <DialogTrigger className="col-start-4 ">
                    <Button className="col-start-4 w-fit" style={{ backgroundColor: "white", color: user.color }}>
                        {isMobile ? '' : 'Log out'} <LogOut /></Button>
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
