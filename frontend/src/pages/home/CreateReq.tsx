import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputGroup, InputGroupAddon, InputGroupButton } from "@/components/ui/input-group"
import TextareaAutosize from "react-textarea-autosize";
import { useIsMobile } from "@/hooks/use-mobile";
import { SendHorizontal } from "lucide-react"

export default function CreateReq() {
    const isMobile = useIsMobile();
    return (<>
        <div className={'grid grid-cols-1 gap-5 place-items-center h-90'}>
            <h1 className="place-self-start ml-3" style={{ fontSize: "2em", fontWeight: "600" }}>Make a request:</h1>
            <div className={isMobile ? "col-span-1 w-80 " : "col-span-1 w-100 "}>
                <Label htmlFor="title" style={{ fontSize: "1.2em" }} className="mb-2">Title</Label>
                <Input type="text" id="title" placeholder="Title" className="mb-4" />

                <Label htmlFor="title" className="mb-2" style={{ fontSize: "1.2em" }}>Description</Label>

                <InputGroup className="mb-2">
                    <TextareaAutosize
                        data-slot="input-group-control"
                        className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
                        placeholder="Type in the description..."
                    />
                    <InputGroupAddon align="block-end">
                        <InputGroupButton className="ml-auto" size="sm" variant="default">
                            Request <SendHorizontal/>
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </div>


        </div>
    </>)
}
