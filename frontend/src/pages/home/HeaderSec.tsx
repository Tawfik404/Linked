import { Button } from "@/components/ui/button"


export default function HeaderSec() {

    return (
    <div className="grid grid-cols-4 w-screen">
        <h1 className="col-span-1">logo</h1>
            <h1 className="mr-3 col-start-3 text-end">Bonjeur John Doe</h1>
            <Button className="col-start-4 w-fit" style={{}}>Se Deconnecter</Button>

    </div>)
}
