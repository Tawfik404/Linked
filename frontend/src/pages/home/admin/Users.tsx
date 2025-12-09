import api from "@/config/api"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import DataTable from "../requests/DataTable";
import { columns } from "./users/columns";
import type { RootState } from "@/config/store";
import { setUsers } from "@/config/sliceUsers";

export default function Users() {
    const dis = useDispatch();
    const users = useSelector((state: RootState) => state.users.users)
    useEffect(() => {
        api.get("/users")
            .then((res) => {
                console.log(res.data);
                const data = res.data.users.reduce((req: object[], el: object) => {
                    if(el.isAdmin == 0 ){
                     req.push({
                        id: el.id,
                        image: el.image,
                        name: `${el.firstname} ${el.lastname}`,
                        requests: el.requests
                    });   
                    }
                    return req;
                }, [])
                dis(setUsers(data))
            })
            .catch((err) => {
                console.log(err);
            })
    }, [dis])
    return (<div className={' place-items-center h-90'}>
        <DataTable columns={columns} data={users} key={users.length} />
    </div>)
}