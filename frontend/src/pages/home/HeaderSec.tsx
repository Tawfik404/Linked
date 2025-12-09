import { Button } from "@/components/ui/button"
import type { RootState } from "@/config/store";
import { useSelector } from "react-redux";
import { LogOut } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";


export default function HeaderSec() {
    const user = useSelector((state: RootState) => state.user.user);
    const isMobile = useIsMobile();
    interface HexToRgbaFn {
        (hex: string, alpha?: number): string;
    }

    function hexToRgba(hex: string, alpha: number = 1): string {
        hex = hex.replace(/^#/, '');

        if (hex.length === 3) {
            hex = hex.split('').map((c: string) => c + c).join('');
        }

        const r: number = parseInt(hex.substring(0, 2), 16);
        const g: number = parseInt(hex.substring(2, 4), 16);
        const b: number = parseInt(hex.substring(4, 6), 16);

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return (
        <div className="grid grid-cols-4 w-screen h-15 items-center mb-2" style={{ backgroundColor: user.color, borderBottomLeftRadius: '0.3em', borderBottomRightRadius: '0.3em' }} >
            <h1 className="col-span-1">logo</h1>
            <h1 className="mr-3 col-start-2 col-span-2 text-end " style={{ fontWeight: 600, fontSize: "1.2em" }} ><span style={{ color: "white" }}>{user.firstname}</span>  {user.lastname}</h1>
            <Button className="col-start-4 w-fit" style={{ backgroundColor:"white",color:user.color }}>{isMobile ? '' : 'Log out'} <LogOut /></Button>
        </div>)
 }
