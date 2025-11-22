//import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import Profile from "./pages/Profile.tsx";
import Signup from "./pages/Signup.tsx";
import { Provider } from 'react-redux';
import{ store} from './config/store.ts'


createRoot(document.getElementById('root')!).render(
  <Provider store={store}>

    <BrowserRouter>
      <App />


      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </Provider>

)
