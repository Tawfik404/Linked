import { useEffect, useState } from 'react'
import DataTable from './requests/DataTable'
import { columns } from './requests/columns'
import type { RequestType } from './requests/columns'
import api from '@/config/api'
import { useSelector } from 'react-redux'
import type { RootState } from '@/config/store'
import { Spinner } from '@/components/ui/spinner'
export default function Requests() {
    const [requests, setRequests] = useState<RequestType[]>([{ id: 1, title: "test", description: "testtt", status: "approved" }])
    const user = useSelector((state: RootState) => state.user.user);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        api.get("/requests", { params: { id: user.id } })
            .then((res) => {
                console.log(res.data);
                const data = res.data.requests.reduce((req: object[], el: object) => {
                    req.push({
                        id: el.id,
                        title: el.title,
                        description: el.description,
                        status: el.status
                    })
                    return req;
                }, [])

                setRequests(data)
                console.log('---', data);

                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err.data);
                setIsLoading(false)

            })
    }, [])
    return (
        <div className={' place-items-center h-90'}>
            {isLoading ? <Spinner /> : <DataTable columns={columns} data={requests} />}
        </div>)

}
