import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider
} from "@/components/ui/sidebar"
import { Send, Home, User } from "lucide-react"
import { useLocation, useNavigate } from "react-router-dom"
import useIsMobile from "useismobile";
import './NavigationSec.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse as HouseSolid, faPaperPlane as PaperPlaneSolid, faUser as UserSolid } from '@fortawesome/free-solid-svg-icons'
import { faHouse as HouseRegular, faPaperPlane as PaperPlaneRegular, faUser as UserRegular } from '@fortawesome/free-regular-svg-icons'


export default function Index({ className }) {
  const isMobile = useIsMobile()
  console.log(isMobile);

  const location = useLocation().pathname
  const nav = useNavigate()
  console.log(location);
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
    <div className={"w-full grid grid-cols-1 justify-items-center" + { className }} style={{ display: isMobile ? "none" : "" }}>
      <SidebarProvider>

        <Sidebar collapsible="none" style={{ borderTopRightRadius: "5px", borderColor: "#e7e3e458", borderWidth: "1px" }}>
          <SidebarHeader>
            <h1 className="text-lg font-bold">Index</h1>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {routes.map((item) => (
                    <SidebarMenuItem key={item.name}>
                      <SidebarMenuButton onClick={(e) => { e.preventDefault(); nav(item.route); }} style={{ backgroundColor: location === item.route ? "#e7e3e4d6" : undefined }}>
                        <a href={item.route} className="flex items-center gap-2" >
                          <FontAwesomeIcon className="w-6 h-6" icon={location === item.route ? item.icon.solid : item.icon.regular} />
                          <span>{item.name}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  </>
}