import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { useNavigate, useLocation } from "react-router-dom"
import useIsMobile from "useismobile";
import './NavigationSec.css'
import { Send, Home, User } from "lucide-react"


export default function NavigationSec() {
  const isMobile = useIsMobile()
  const nav = useNavigate()

  const location = useLocation().pathname
  console.log(location);
  const routes = [
    { name: 'Home', route: '/home',icon:Home },
    { name: 'Profile', route: '/home/profile',icon:User },
    { name: 'Requests', route: '/home/requests',icon:Send },
  ]
  return <>
  <div className="w-full grid grid-cols-1 justify-items-center" style={{ display:isMobile?"": "none"}}>

    <NavigationMenu className="col-span-full ">
      <NavigationMenuList className=" gap-x-2">
          {routes.map((route) => (
            <NavigationMenuItem key={route.route}>
              <NavigationMenuLink
                onClick={(e) => { e.preventDefault(); nav(route.route); }}
                href={route.route}
                id="navlink"
                className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded"
                style={{ backgroundColor: location === route.route ? "#e7e3e4d6" : undefined }}
              >
                <route.icon className="w-6 h-6" />
                <span className="text-sm">{route.name}</span>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
      </NavigationMenuList>
    </NavigationMenu>
</div>
  </>

}
