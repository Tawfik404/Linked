import { Button } from "@/components/ui/button"
import type { RootState } from "@/config/store";
import { useSelector } from "react-redux";
import { LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";


export default function HeaderSec() {
    const user = useSelector((state: RootState) => state.user.user);
    const isMobile = useIsMobile();
    function hexToRgba(hex, alpha = 1) {
        hex = hex.replace(/^#/, '');

        if (hex.length === 3) {
            hex = hex.split('').map(c => c + c).join('');
        }

        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return (
        <div className="grid grid-cols-4 w-screen h-15 items-center mb-2" style={{ backgroundColor: hexToRgba(user.color, 0.13), borderBottomLeftRadius: '0.3em', borderBottomRightRadius: '0.3em' }} >
            <h1 className="col-span-1">logo</h1>
            <h1 className="mr-3 col-start-2 col-span-2 text-end " style={{ fontWeight: 600, fontSize: "1.2em" }} ><span style={{ color: user.color }}>{user.firstname}</span>  {user.lastname}</h1>
            <Button className="col-start-4 w-fit" style={{ background: user.color }}>{isMobile ? '' : 'Log out'} <LogOut /></Button>
        </div>)
 }
