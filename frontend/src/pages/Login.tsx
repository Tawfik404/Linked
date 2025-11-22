import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
//import * as React from "react"
import { useEffect, useState } from "react"
import { Spinner } from "@/components/ui/spinner"
import api from '../config/api'
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setUser } from '../config/slice.ts';
import type { AppDispatch } from '../config/store';

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  })

  const [errorMsg,setErrorMsg] = useState("")
  const [resLogin,setResLogin] = useState({})
  const handleLogin = () => {
        setIsLoading(true)

    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    
    if (!(emailRegEx.test(userInfo.email))) {
      setErrorMsg("Email is Not Valid")
        setIsLoading(false)

      return
    }

    else{
      setErrorMsg("")

      api.post("/login",userInfo)
      .then(res=>{
        console.log(res.data);
        setResLogin(res.data)
        setIsLoading(false)})
      .catch(err=> {console.log(err)
        setIsLoading(false)

      })
      
    }

  }

  
  const nav = useNavigate()

  const dispatch = useDispatch<AppDispatch>();

  useEffect(()=>{
    console.log(resLogin);
    
if(resLogin.status == 200){
  dispatch(setUser(resLogin.user))
  nav("/home")
}
  },[resLogin,nav,dispatch])


  return (
    <div className="flex flex-col justify-center  h-screen">

      <Card className="w-full max-w-sm self-center">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  required
                  onChange={(e)=>setUserInfo({...userInfo,email:e.target.value})}
                  value={userInfo.email}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>

                <Input id="password" type="password" required placeholder="********" 
                                  onChange={(e)=>setUserInfo({...userInfo,password:e.target.value})}
                  value={userInfo.password}
                />
              </div>
            </div>
            <p className="mt-3" >{errorMsg}</p>

          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full" onClick={handleLogin}>
            Log{isLoading ? "ging" : ""} in{isLoading ? <Spinner /> : ""}

          </Button>
          <Button variant="outline" className="w-full" onClick={()=>nav("/signup")}>
            Sign Up
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
