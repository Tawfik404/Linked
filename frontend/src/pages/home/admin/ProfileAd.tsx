import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
 CardFooter,
 // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ChevronDownIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "@/config/store"
import countries from '@/assets/country-flag.json'
import currencies from '@/assets/Currency.json'
import themes from '@/assets/themes.json'
import { useState } from "react"
import api from "@/config/api"
import { setUser } from "@/config/slice"
import { toast } from "sonner"
import { Spinner } from "@/components/ui/spinner"
export default function ProfileAd({className}){
  const nav = useNavigate()
  const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.user.user);
    const [color,setColor] = useState<String>(user.color)
    const [isLoading,setIsLoading] = useState<Boolean>(false)
    const updateColor = ()=>{
      setIsLoading(true)
      const age = new Date(user.date).getFullYear()
      const thisYear = new Date().getFullYear()
      if(thisYear - age < 15){
        toast.warning("Permistion required")
        setIsLoading(false)
        return
      }
      
      if(user.color != color){
        api.patch(`/requests/${user.id}`,{color:color})
        .then((res)=>{console.log(res.data)
          dispatch(setUser(res.data.user))
          setIsLoading(false)
        })
        .catch((e)=>{
          console.log(e)
          setIsLoading(false)
        })
        
      }
      else{

        setIsLoading(false)
      }
    }

    return <div className='grid grid-cols-1 gap-5 place-items-center h-90'>
              <Card className="w-full max-w-sm self-center">
        <CardHeader>

          <CardTitle style={{ fontSize: 20, marginBottom: 5, fontWeight: "bold", color: user.color,textAlign:"center"}}>Edit Profile</CardTitle>


          <Avatar className="w-25 h-auto flex-col  justify-self-center">
            {/* <input onChange={handleFileChange} ref={imgRef} type="file" alt="img" placeholder="img" className="h-25" style={{ display: "none" }} disabled /> */}
            <AvatarImage className="justify-self-center" src={user.image} alt="@shadcn" />
            <AvatarFallback>Profile</AvatarFallback>
          </Avatar>

        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstname">Nom</Label>
                  <Input
                    id="firstname"
                    type="name"
                    placeholder="Mike"
                    value={user.firstname}
                    disabled
                  //  value={userInfo.firstname}
                  //  onChange={(e) => { setUserInfo({ ...userInfo, firstname: e.target.value }) }}

                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="lastname">Prenom</Label>
                  <Input
                    id="lastname"
                    type="name"
                    placeholder="Tyson"
                    value={user.lastname}
                    disabled
                  //  onChange={(e) => { setUserInfo({ ...userInfo, lastname: e.target.value }) }}
                  //  value={userInfo.lastname}

                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={user.email}
                  disabled
                 // onChange={(e) => { setUserInfo({ ...userInfo, email: e.target.value }) }}
                 // value={userInfo.email}

                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>

                </div>
                <Input id="password" type="password" disabled
                placeholder="*******"
                  //value={userInfo.password}
                 // onChange={(e) => { setUserInfo({ ...userInfo, password: e.target.value }) }}
                />
              </div>
            </div>


            <Label htmlFor="date" className="my-2">
              Date of birth
            </Label>
            <Popover>
              <PopoverTrigger asChild className="flex content-start">
                <Button
                  variant="outline"
                  id="date"
                  className="w-48 justify-between font-normal"
                  disabled
                  
                >
                  {user.date}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start" >
                <Calendar
                  mode="single"
                  ///selected={user.date.toLocaleDateString()}
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>

            <Label htmlFor="country" className="my-2">
              Pays
            </Label>
            <Select
             value={user.country}
             // onValueChange={(country) => { setUserInfo({ ...userInfo, country: country }) }}
            
            >
              <SelectTrigger className="w-[180px]" disabled>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                 {countries.map((country) => {
                  return <SelectItem key={country.country} value={country.country}>
                    <img alt={country.code} src={country.flag} className="w-5" />
                    {country.country}</SelectItem>
                })} 
              </SelectContent>
            </Select>

            <Label htmlFor="currency" className="my-2">
              Devise
            </Label>
            <Select
            disabled
              value={user.currency}
              //onValueChange={(currency) => { setUserInfo({ ...userInfo, currency: currency }) }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>

                {Object.values(currencies).map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.name} | {currency.symbol_native}
                  </SelectItem>
                ))}


              </SelectContent>
            </Select>


            <Select
            value={color}
            onValueChange={(newColor)=>{setColor(newColor); console.log(newColor);
            }}
            >

              <Label htmlFor="color" className="my-2">
                Color
              </Label>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme Color" />
              </SelectTrigger>
              <SelectContent >
                <SelectGroup >
                  <SelectLabel>Colors</SelectLabel>
                   {themes.map((color) => {
                    return <SelectItem key={color.code} className="flex justify-items-end" value={color.code}>
                      <div style={{ backgroundColor: color.code, color: "white", borderRadius: "50%" }} className="w-5 h-5"></div>
                      {color.name}
                    </SelectItem>
                  })} 


                </SelectGroup>
              </SelectContent>
            </Select>
          </form>
        </CardContent>
                <CardFooter className="flex-row gap-2 justify-end">
          <Button variant="outline" className="w-fit"  onClick={() => { nav("/home") }} style={{ color:user.color }}>
            Cancel
          </Button>
          <Button type="submit" onClick={updateColor} className='w-fit' style={{ background:user.color }} >

            Save {isLoading? <Spinner/>:''}

          </Button>

        </CardFooter>
      </Card>
    </div>

}
