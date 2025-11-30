import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { useNavigate, useLocation } from "react-router-dom"
import useIsMobile from "useismobile";
import './NavigationSec.css'
import { Send, Home, User } from "lucide-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse as HouseSolid, faPaperPlane as PaperPlaneSolid, faUser as UserSolid } from '@fortawesome/free-solid-svg-icons'
import { faHouse as HouseRegular, faPaperPlane as PaperPlaneRegular, faUser as UserRegular } from '@fortawesome/free-regular-svg-icons'
import { useSelector } from "react-redux";
import type { RootState } from "@/config/store";


export default function NavigationSec() {
  const isMobile = useIsMobile()
  const nav = useNavigate()
  const user = useSelector((state: RootState) => state.user.user);

  const location = useLocation().pathname
  const routes = [
    {
      name: 'Home', route: '/home',
      icon: {
        solid: HouseSolid,
        regular: HouseRegular
      }
    },
    {
      name: 'Requests', route: '/home/requests',
      icon: {
        solid: PaperPlaneSolid,
        regular: PaperPlaneRegular
      }
    },
    {
      name: 'Profile', route: '/home/profile',
      icon: {
        solid: UserSolid,
        regular: UserRegular
      }
    },
  ]

  return <>
    <div className="w-full grid grid-cols-1 justify-items-center" style={{ display: isMobile ? "" : "none" }}>
      <NavigationMenu className="col-span-full ">
        <NavigationMenuList className=" gap-x-2">
          {routes.map((route) => (
            <NavigationMenuLink
              onClick={(e) => { e.preventDefault(); nav(route.route); }}
              href={route.route}
              id="navlink"
              className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded"
              style={{ backgroundColor: location === route.route ? "#e7e3e480" : undefined, color: location === route.route ? user.color : undefined, fontWeight: location === route.route ? 600 : undefined }}
              key={route.route}
            >
              <FontAwesomeIcon className="w-6 h-6" 
              icon={location === route.route ? route.icon.solid : route.icon.regular} 
              style={{color:location === route.route ? user.color : undefined}} />
              <span className="text-sm">{route.name}</span>
            </NavigationMenuLink>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  </>

}
