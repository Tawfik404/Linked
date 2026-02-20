import { useEffect, useState } from 'react'
import DataTable from './requests/DataTable'
import { columns } from './requests/columns'
import type { RequestType } from './requests/columns'
import api from '@/config/api'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/config/store'
import { motion } from "motion/react";


import { setRequests } from '@/config/sliceReqs'
export default function RequestsAd() {
    const user = useSelector((state: RootState) => state.user.user);
    const reqs = useSelector((state: RootState) => state.requests.requests);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        api.get("/requests")
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
                console.log(reqs);

                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false)

            })
    }, [dispatch, user.id])



    return (
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
            className={' place-items-center h-full mb-6'}
        >
            <DataTable columns={columns} data={reqs} key={JSON.stringify(reqs)} />
        </motion.div>
    )

}
