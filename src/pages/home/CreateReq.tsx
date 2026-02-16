import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputGroup, InputGroupAddon, InputGroupButton } from "@/components/ui/input-group"
import TextareaAutosize from "react-textarea-autosize";
import { useIsMobile } from "@/hooks/use-mobile";
import { SendHorizontal } from "lucide-react"
import { useState } from "react";
import api from "@/config/api";
import { useSelector } from "react-redux";
import type { RootState } from "@/config/store";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { motion } from "motion/react";

export default function CreateReq() {
    const isMobile = useIsMobile();
    const [isLoading, setIsLoading] = useState(false)
    const [request, setRequest] = useState({ title: "", description: "" })
    const user = useSelector((state: RootState) => state.user.user);
    const handleReq = () => {
        const userId = user.id
        setIsLoading(true)
        if (request.title.length > 0 && request.description.length > 0) {
            api.post('/requests', { ...request, id: userId })
                .then((res) => {
                    console.log(res.data)
                    setRequest({ title: "", description: "" })
                    setIsLoading(false)
                    toast.success("Request has been added successfully")
                })
                .catch((err) => {
                    console.log(err);
                    setIsLoading(false)
                    setIsLoading(false)
                    toast.warning("Something went wrong,try again")
                })
        }
        else {
            setIsLoading(false)
            toast.warning("Title and description should not be empty")
        }


    }
    return (
        <div className={'grid grid-cols-1 gap-5 place-items-center h-90'}>

            <h1 className="place-self-start ml-3" style={{ fontSize: "2em", fontWeight: "600", color: user.color }}>Make a request:</h1>
            <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className={isMobile ? "col-span-1 w-80 " : "col-span-1 w-100 "}
            >

                <Label htmlFor="title" style={{ fontSize: "1.2em" }} className="mb-2">Title</Label>
                <Input type="text" id="title" placeholder="Title" className="mb-4"
                    value={request.title}
                    onChange={(e) => { setRequest({ ...request, title: e.target.value }) }}
                    required
                />

                <Label htmlFor="title" className="mb-2" style={{ fontSize: "1.2em" }}>Description</Label>

                <InputGroup className="mb-2">
                    <TextareaAutosize
                        data-slot="input-group-control"
                        className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
                        placeholder="Type in the description..."
                        value={request.description}
                        onChange={(e) => { setRequest({ ...request, description: e.target.value }) }}
                        required
                    />
                    <InputGroupAddon align="block-end">
                        <InputGroupButton className="ml-auto" size="sm" variant="default" onClick={handleReq} style={{ background: user.color }}>
                            Request {isLoading ? <Spinner /> : <SendHorizontal />}
                        </InputGroupButton>
                    </InputGroupAddon>
                </InputGroup>
            </motion.div>
        </div>
    )
}
