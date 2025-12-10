
import type { ColumnDef } from "@tanstack/react-table"
import * as React from "react"
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
//import {  } from '@fortawesome/free-regular-svg-icons'




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
    header: ()=><p className="text-center">Image</p>,
    cell: ({ row }) => {
      return <img src={row.getValue('image')} alt="" className="rounded-full w-15 "  />
    }
  },
  {
    accessorKey: "name",
    header: ()=><p className="text-center">Name</p>,
  },
  {
    accessorKey: "requests",
    header: ()=><p className="text-center">Requests</p>,
    cell: ({ row }) => <p className="text-center font-semibold">{row.getValue("requests")}</p>
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const request = row.original
      const user = useSelector((state: RootState) => state.user.user);
      const dispatch = useDispatch()
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => {
              console.log(row.original.id);
              api.get(`/users/${row.original.id}`)
                .then((res) => {
                  dispatch(setUserEdit(res.data))
                  // TODO: add view user details componenet
                })
                .catch((err) => {
                  console.log(err);
                })
            }}>
            <FontAwesomeIcon icon={faCircleInfo} />
              Details
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => {
              console.log(row.original.id);
              api.get(`/users/${row.original.id}`)
                .then((res) => {
                  console.log(res.data);

                  dispatch(setUserEdit(res.data))
                  //render edit user component
                })
                .catch((err) => {
                  console.log(err);
                })
            }}>
              <FontAwesomeIcon icon={faPenToSquare} />
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                console.log(row.original.id);
                api.delete(`/users/${row.original.id}`)
                  .then((res) => {
                    console.log(res.data);
                    const data = res.data.requests.reduce((req: object[], el: object) => {
                      req.push({
                        id: el.id,
                        title: el.title,
                        description: el.description,
                        status: el.status
                      });
                      return req;
                    }, [])
                    dispatch(setUsers(data))
                    toast.success("User Removed")
                  })
                  .catch((err) => {
                    console.log(err);
                    toast.warning("User was not Removed")
                  })
              }}>
              <FontAwesomeIcon icon={faTrashCan} />
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]