import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import * as React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup,
} from "@/components/ui/select"

import countries from "../assets/country-flag.json";
import currencies from "../assets/Currency.json";
import themes from "../assets/themes.json";
import axios from "axios";
import { useNavigate } from "react-router-dom"

import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../config/slice.ts';
import { useAppSelector } from '../hooks/useAppSelector.ts'
import type { RootState, AppDispatch } from '../config/store';
import { Spinner } from "@/components/ui/spinner"

export default function Signup() {

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [img, setImg] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const imgRef = useRef(null);
  const [resSignUp, setResSignUp]   = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [userInfo, setUserInfo] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    date: '',
    country: '',
    currency: '',
    color: '',
    img: ''
  });

  const [errorMsg, setErrorMsg] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImgFile(file)

    const url = URL.createObjectURL(file);
    setImg(url);



  };


  const nav = useNavigate()
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (resSignUp && resSignUp.status == 200) {
      //setUserInfo(resSignUp)


      dispatch(setUser(resSignUp.user))
      nav("/home")
    }
  }, [resSignUp, nav, dispatch])


  const handlUserInfo = async () => {
    console.log(userInfo);

    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const pwdRegEx = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,}$/

    if (userInfo.firstname.length < 3 || userInfo.lastname.length < 3) {
      setErrorMsg("First name and Last name should be at least 3 characters")
    }

    else if (!(emailRegEx.test(userInfo.email))) {
      setErrorMsg("Email is Not Valid")
      return
    }

    else if (!(pwdRegEx.test(userInfo.password))) {
      setErrorMsg("Password is Not Valid")
      return
    }

    //const dateNow = Date()
    else if (userInfo.date.length == 0 || userInfo.date >= Date()) {
      setErrorMsg("Invalid date of birth")
      return
    }


    else if (userInfo.country.length == 0) {
      setErrorMsg("Please choose the country")
      return
    }

    else if (userInfo.currency.length == 0) {
      setErrorMsg("Please choose the currency")
      return
    }

    else if (userInfo.color.length == 0) {
      setErrorMsg("Please choose the theme color")
      return
    }
    


    else {
      setIsLoading(true)

      const formData = new FormData();
      formData.append("file", imgFile);
      formData.append("upload_preset", "imgUpload"); // unsigned preset

      // 1. Upload to Cloudinary
      const uploadRes = await axios.post(
        `https://api.cloudinary.com/v1_1/dg1hjs28s/image/upload`,
        formData
      ).catch(() => { setIsLoading(false) })

      const urlImage = uploadRes.data.secure_url;
      //setImgURL(urlImage);\

      if (urlImage) {
        setUserInfo({ ...userInfo, img: urlImage })
      }
    }
  }


  useEffect(() => {
    if (userInfo.img.length > 0) {
      console.log(userInfo);

      axios.post("http://127.0.0.1:8000/api/signup", { ...userInfo })
        .then(res => { console.log(res.data); setResSignUp(res.data); setIsLoading(false) })
        .catch(err => { console.log(err); setIsLoading(false) })



    }
  }, [userInfo])



  return (
    <div className="flex flex-col justify-center  h-screen">
      <Card className="w-full max-w-sm self-center">
        <CardHeader>

          <CardTitle style={{ fontSize: 20, marginBottom: 5, fontWeight: "bold", color: userInfo.color }}>Make an Account</CardTitle>


          <Avatar className="w-25 h-auto flex-col  justify-self-center" onClick={() => {
            if (imgRef.current) {
              imgRef.current.click()
            }
          }}>
            <input onChange={handleFileChange} ref={imgRef} type="file" alt="img" placeholder="img" className="h-25" style={{ display: "none" }} required />
            <AvatarImage className="justify-self-center" src={img ? img : "https://github.com/shadcn.png"} alt="@shadcn" />
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
                    required
                    value={userInfo.firstname}
                    onChange={(e) => { setUserInfo({ ...userInfo, firstname: e.target.value }) }}

                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="lastname">Prenom</Label>
                  <Input
                    id="lastname"
                    type="name"
                    placeholder="Tyson"
                    required
                    onChange={(e) => { setUserInfo({ ...userInfo, lastname: e.target.value }) }}
                    value={userInfo.lastname}

                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                  onChange={(e) => { setUserInfo({ ...userInfo, email: e.target.value }) }}
                  value={userInfo.email}

                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>

                </div>
                <Input id="password" type="password" required
                placeholder="*******"
                  value={userInfo.password}
                  onChange={(e) => { setUserInfo({ ...userInfo, password: e.target.value }) }}
                />
              </div>
            </div>


            <Label htmlFor="date" className="my-2">
              Date of birth
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild className="flex content-start">
                <Button
                  variant="outline"
                  id="date"
                  className="w-48 justify-between font-normal"
                >
                  {date ? date.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setDate(date)
                    setOpen(false)
                    setUserInfo({ ...userInfo, date: date?.toLocaleDateString() })
                  }}
                />
              </PopoverContent>
            </Popover>

            <Label htmlFor="country" className="my-2">
              Pays
            </Label>
            <Select
              value={userInfo.country}
              onValueChange={(country) => { setUserInfo({ ...userInfo, country: country }) }}

            >
              <SelectTrigger className="w-[180px]">
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
              value={userInfo.currency}
              onValueChange={(currency) => { setUserInfo({ ...userInfo, currency: currency }) }}
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
              value={userInfo.color}
              onValueChange={(color) => { setUserInfo({ ...userInfo, color: color }) }}
            >

              <Label htmlFor="color" className="my-2">
                Color
              </Label>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme Color" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
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
            <p className="mt-3" style={{ color: userInfo.color }}>{errorMsg}</p>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className='w-full' onClick={handlUserInfo} style={{ backgroundColor: userInfo.color }}>

            Sign{isLoading ? "ing" : ""} up{isLoading ? <Spinner /> : ""}

          </Button>
          <Button variant="outline" className="w-full" style={{ color: userInfo.color }} onClick={() => { nav("/login") }}>
            Login
          </Button>

        </CardFooter>
      </Card>

    </div>
  )
}
