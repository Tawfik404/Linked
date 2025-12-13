import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import api from "@/config/api";
import type { RootState } from "@/config/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//list of cards
//totall number users
//totall requests
//totall admins
//totall requests accepted
//totall requests rejected
//total requests pending
export default function Dashboard() {
    const [isLoading, setIsloading] = useState(true);
    const [stats, setStats] = useState([
        { num: 0, name: 'users' },
        { num: 0, name: 'admins' },
        { num: 0, name: 'requests' },
        { num: 0, name: 'pending' },
        { num: 0, name: 'accepted' },
        { num: 0, name: 'rejected' },
    ])
    useEffect(() => {
        api.get("/stats")
            .then((res) => {
                const data = [
                    { num: res.data.users, name: 'users' },
                    { num: res.data.admins, name: 'admins' },
                    { num: res.data.requests, name: 'requests' },
                    { num: res.data.pending, name: 'pending' },
                    { num: res.data.accepted, name: 'accepted' },
                    { num: res.data.rejected, name: 'rejected' },]
                console.log(res.data);

                setStats(data);
                setIsloading(false)

            })
            .catch(err => { console.log(err); setIsloading(false) })
    }, [])

    const user = useSelector((state: RootState) => state.user.user)

    return <div className=" content-center h-140 grid min-md:grid-cols-3 max-md:grid-cols-3 max-sm:grid-cols-2 *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        {isLoading ? <div className="col-span-full flex items-center justify-center h-full"><Spinner className="size-7"/></div> :




            
                stats.map((el,i) => {
                    return (<Card className="@container/card " key={i}>
                        <CardHeader>
                            <CardDescription >Total {el.name}</CardDescription>
                            <CardTitle style={{ color: user.color}} className="text-4xl font-bold tabular-nums @[250px]/card:text-3xl">
                                {el.num}
                            </CardTitle>
                            <CardAction>

                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <div className="line-clamp-1 flex gap-2 font-medium">
                            </div>
                        </CardFooter>
                    </Card>)
                })
            
        }
    </div>
}