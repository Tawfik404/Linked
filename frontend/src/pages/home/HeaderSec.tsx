import { Button } from "@/components/ui/button"
import type { RootState } from "@/config/store";
import { useSelector } from "react-redux";
import { LogOut } from "lucide-react";


export default function HeaderSec() {
    const user = useSelector((state: RootState) => state.user.user);

    return (
    <div className="grid grid-cols-4 w-screen">
        <h1 className="col-span-1">logo</h1>
            <h1 className="mr-3 col-start-3 text-end">Welcome {user.firstname+" "+ user.lastname}</h1>
            <Button className="col-start-4 w-fit" style={{ background:user.color }}>Log out <LogOut/></Button>

    </div>)
}
