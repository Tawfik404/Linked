import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import Profile from "./pages/home/Profile.tsx";
import Signup from "./pages/Signup.tsx";
import { Provider } from 'react-redux';
import { store } from './config/store.ts'
import Requests from './pages/home/Requests.tsx';
import CreateReq from './pages/home/CreateReq.tsx';
import HomeAd from './pages/home/admin/HomeAd.tsx';
import Dashboard from './pages/home/admin/Dashboard.tsx';
import Users from './pages/home/admin/Users.tsx';
import ProfileAd from './pages/home/admin/ProfileAd.tsx';
import RequestsAd from './pages/home/admin/RequestsAd.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>

        <App />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/" element={<Home />}>
            <Route index element={<CreateReq />} />
            <Route path="createReq" element={<CreateReq />} />
            <Route path="requests" element={<Requests />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path='/admin' element={<HomeAd />}>
            <Route index element={<Dashboard />} />
            <Route path="" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="requests" element={<RequestsAd />} />
            <Route path="profile" element={<ProfileAd />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)
