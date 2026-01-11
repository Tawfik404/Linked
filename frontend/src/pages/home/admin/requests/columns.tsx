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
import { setRequests } from "@/config/sliceReqs"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faCircleXmark ,faHourglassHalf} from '@fortawesome/free-regular-svg-icons'



export type RequestType = {
  id: number
  image: string
  title: string
  description: string
  status: "Pending" | "Accepted" | "Rejected"
}

export const columns: ColumnDef<RequestType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "image",
    header: () => <p className="">User</p>,
    cell: ({ row }) => {
      return <img src={row.getValue('image')} alt="" className=" rounded-full w-15 " />
    }
  },
  {
    accessorKey: "title",
    header: () => <p className="text-center">Title</p>,
  },
  {
    accessorKey: "description",
    header: () => <p className="text-center">Description</p>,
  },
  {
    accessorKey: "status",
    header: () => <p className="text-center">Status</p>,
    cell:({row})=>{
      return <div className="text-center">
      <FontAwesomeIcon 
      color={row.original.status == "Accepted" ?'darkcyan': row.original.status == "Rejected"? 'crimson':'grey'}
      icon={row.original.status == "Accepted" ?faCircleCheck: row.original.status == "Rejected"? faCircleXmark:faHourglassHalf}
      style={{ fontSize:"1.3em" }}
      />
      </div>
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
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

              api.patch(`/stats/${row.original.id}/Accepted`)
                .then((res) => {
                  const data = res.data.requests.reduce((r: object[], el: object) => {
                    r.push({
                      id: el.id,
                      image: el.image,
                      title: el.title,
                      description: el.description,
                      status: el.status,
                    });
                    return r;
                  }, [])
                  dispatch(setRequests(data))
                  toast.success("Request accepted")
                })
                .catch((err) => {
                  console.log(err);
                  toast.warning("something went wrong")
                })
            }}>
              <FontAwesomeIcon icon={faCircleCheck} />
              Accept
            </DropdownMenuItem>


            <DropdownMenuItem onClick={() => {
              console.log(row.original.id);
              api.patch(`/stats/${row.original.id}/Rejected`)
                .then((res) => {
                  console.log(res.data);
                  const data = res.data.requests.reduce((req: object[], el: object) => {
                    req.push({
                      id: el.id,
                      image: el.image,
                      title: el.title,
                      description: el.description,
                      status: el.status,
                    });
                    return req;
                  }, [])
                  dispatch(setRequests(data))
                  toast.success("Request rejected")
                })
                .catch((err) => {
                  console.log(err);
                  toast.success("something went wrong")
                })
            }}>
              <FontAwesomeIcon icon={faCircleXmark} />
              Reject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]