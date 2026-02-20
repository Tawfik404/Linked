
import type { ColumnDef } from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import api from "@/config/api"
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/config/store"
import { setUsers } from "@/config/sliceUsers"
import { setUserEdit } from "@/config/sliceUserEdit"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenToSquare, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import UsersDetails from "../UserDetails"
import UserEdit from "../UserEdit"
//import {  } from '@fortawesome/free-regular-svg-icons'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export type RequestType = {
  id: number
  image: string
  name: string
  requests: number
}

export const columns: ColumnDef<RequestType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "image",
    header: () => <p className="text-center">Image</p>,
    cell: ({ row }) => {
      return <img src={row.getValue('image')} alt="" className="rounded-full w-15 " />
    }
  },
  {
    accessorKey: "name",
    header: () => <p className="text-center">Name</p>,
  },
  {
    accessorKey: "requests",
    header: () => <p className="text-center">Requests</p>,
    cell: ({ row }) => <p className="text-center font-semibold">{row.getValue("requests")}</p>
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const request = row.original
      const user = useSelector((state: RootState) => state.user.user);
      const dispatch = useDispatch()
      const [open1, setOpen1] = useState(false)
      const [open2, setOpen2] = useState(false)
      const [open3, setOpen3] = useState(false)
      const [activeRow, setActiveRow] = useState(null)
      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setOpen1(true)}>
                <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
                Details
              </DropdownMenuItem>


              <DropdownMenuItem onClick={() => setOpen2(true)}>
                <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                Edit
              </DropdownMenuItem>





              <DropdownMenuItem
                onClick={() => {
                  setOpen3(true)
                }}>
                <FontAwesomeIcon icon={faTrashCan} />
                Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>


          {/* Show user details */}
          <Dialog open={open1} onOpenChange={setOpen1}>
            <DialogContent className="w-auto">
              <DialogHeader>
                <DialogTitle style={{ color: user.color, fontWeight: 600, fontSize: "1.4em" }}>User Info</DialogTitle>
                <DialogDescription className="flex justify-center">
                  <UsersDetails id={row.original.id} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>




          {/* Edit user details */}
          <Dialog open={open2} onOpenChange={setOpen2}>
            <DialogContent className="w-auto">
              <DialogHeader>
                <DialogTitle style={{ color: user.color, fontWeight: 600, fontSize: "1.4em" }}>Edit user</DialogTitle>
                <DialogDescription className="flex justify-center">
                  <UserEdit id={row.original.id} />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>




          {/* Delete a user */}
          <Dialog open={open3} onOpenChange={setOpen3}>
            <DialogContent className="w-auto">
              <DialogHeader>
                <DialogTitle style={{ color: user.color, fontWeight: 600, fontSize: "1.4em" }}>Delete this user?</DialogTitle>
                <DialogDescription className="flex justify-center">
                  <Avatar className="w-50 h-auto " >
                    <AvatarImage className="justify-self-center" src={row.original.image} alt="@shadcn" />
                    <AvatarFallback>Profile</AvatarFallback>
                  </Avatar>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>


        </>
      )
    },
  },
]