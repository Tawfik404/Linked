import { useEffect, useState } from 'react'
import DataTable from './requests/DataTable'
import { columns } from './requests/columns'
import type { RequestType } from './requests/columns'
import api from '@/config/api'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/config/store'
import { Spinner } from '@/components/ui/spinner'

import { setRequest } from '@/config/sliceReq'
export default function Requests() {
    const user = useSelector((state: RootState) => state.user.user);
    const reqs = useSelector((state: RootState) => state.request.request);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
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

                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
                setIsLoading(false)

            })
    }, [dispatch,user.id])



    return (
        <div className={' place-items-center h-90'}>
            <DataTable columns={columns} data={reqs} key={reqs.length} />
        </div>
     )

}
