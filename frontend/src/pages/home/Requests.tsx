import { useEffect } from 'react'
import DataTable from './requests/DataTable'
import { columns } from './requests/columns'
import api from '@/config/api'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/config/store'
import { setRequest } from '@/config/sliceReq'
import { motion } from "motion/react";

export default function Requests() {
    const user = useSelector((state: RootState) => state.user.user);
    const reqs = useSelector((state: RootState) => state.request.request);
    const dispatch = useDispatch();


    useEffect(() => {
        api.get(`/requests/${user.id}`)
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

            })
            .catch((err) => {
                console.log(err);

            })
    }, [dispatch, user.id])



    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className={' place-items-center h-90 py-3 w-full '}
        >
            <DataTable columns={columns} data={reqs} key={reqs.length} />
        </motion.div>
    )

}
