import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from "./pages/Signup.tsx";
import { Toaster } from "@/components/ui/sonner"
function App({ children }) {

  return (
    <>
      {children}
      <Toaster />
    </>
  )
}

export default App
