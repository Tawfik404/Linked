import api from "@/config/api"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import DataTable from "../requests/DataTable";
import { columns } from "./users/columns";
import type { RootState } from "@/config/store";
import { setUsers } from "@/config/sliceUsers";
import { motion } from "motion/react"
export default function Users() {
    const dis = useDispatch();
    const users = useSelector((state: RootState) => state.users.users)
    useEffect(() => {
        api.get("/users")
            .then((res) => {
                console.log(res.data);
                const data = res.data.users.reduce((req: object[], el: object) => {
                    if (el.isAdmin == 0) {
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
    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className={' place-items-center h-screen'}
        >
            <DataTable columns={columns} data={users} key={users.length} />
        </motion.div>
    )
}