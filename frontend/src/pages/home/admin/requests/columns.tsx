
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
import { setRequest } from "@/config/sliceReq"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck ,faCircleXmark} from '@fortawesome/free-regular-svg-icons'



export type RequestType = {
  id: number
  image: string
  title: string
  description: string
  status: "pending" | "approved" | "rejected"
}

export const columns: ColumnDef<RequestType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "image",
    header: ()=><p className="text-center">User</p>,
    cell: ({ row }) => {
      return <img src={row.getValue('image')} alt="" className=" rounded-full w-15 " />
    }
  },
  {
    accessorKey: "title",
    header: ()=><p className="text-center">Title</p>,
  },
  {
    accessorKey: "description",
    header:()=><p className="text-center">Description</p>,
  },
  {
    accessorKey: "status",
    header: ()=><p className="text-center">Status</p>,
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
              api.post(`/requests`, {
                params: {
                  id: row.original.id,
                  status: 'accepted'
                }
              })
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
                  dispatch(setRequest(data))
                  toast.success("Request accepted")
                })
                .catch((err) => {
                  console.log(err);
                  toast.success("something went wrong")
                })
            }}>
              <FontAwesomeIcon icon={faCircleCheck}/>
              Accept
            </DropdownMenuItem>


                        <DropdownMenuItem onClick={() => {
              console.log(row.original.id);
              api.post(`/requests`, {
                params: {
                  id: row.original.id,
                  status: 'rejected'
                }
              })
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
                  dispatch(setRequest(data))
                  toast.success("Request rejected")
                })
                .catch((err) => {
                  console.log(err);
                  toast.success("something went wrong")
                })
            }}>
              <FontAwesomeIcon icon={faCircleXmark}/>
              Reject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]