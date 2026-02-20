
import './App.css'
import { Toaster } from "@/components/ui/sonner"
function App({ children }) {

  return (
    <div>
      {children}
      <Toaster />
    </div>
  )
}

export default App
