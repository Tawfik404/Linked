import DataTable from './requests/DataTable'
import {columns} from './requests/columns'
import type {RequestType} from './requests/columns'
export default function Requests(){
    const req:RequestType[] = [{id:1,title:"test",description:"testtt",status:"approved"}]
    return (
        <div className={' place-items-center h-90'}>
         <DataTable columns={columns} data={req}/>
        </div>)

}
