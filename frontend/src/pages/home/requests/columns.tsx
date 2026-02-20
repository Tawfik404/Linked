
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
import { faCircleCheck, faCircleXmark, faHourglassHalf } from '@fortawesome/free-regular-svg-icons'

export type RequestType = {
  id: number
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
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {

      return <div className="text-center">
        <FontAwesomeIcon
          color={row.original.status == "Accepted" ? 'darkcyan' : row.original.status == "Rejected" ? 'crimson' : 'grey'}
          icon={row.original.status == "Accepted" ? faCircleCheck : row.original.status == "Rejected" ? faCircleXmark : faHourglassHalf}
          style={{ fontSize: "1.3em" }}
        />
      </div>
    }
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = useSelector((state: RootState) => state.user.user);
      const dispatch = useDispatch()
      return <>
        {
          row.original.status == "Accepted" || row.original.status == "Rejected" ? <></> :
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
                  api.delete(`/requests`, {
                    params: {
                      userId: user.id,
                      id: row.original.id
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
                      toast.success("Request canceled")
                    })
                    .catch((err) => {
                      console.log(err);
                    })
                }}>
                  Cancel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        }
      </>
    },
  },
]