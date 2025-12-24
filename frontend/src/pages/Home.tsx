import { useSelector } from 'react-redux';
import type { RootState } from '../config/store';
import HeaderSec from './home/HeaderSec';
import NavigationSec from './home/NavigationBar';
import Index from './home/Index';
import { Outlet, useNavigate } from 'react-router-dom';
import useIsMobile from "useismobile";
import { useEffect } from 'react';
import IndexAd from './home/admin/IndexAd';
import Footer from './home/Footer';

export default function Home() {
    const user = useSelector((state: RootState) => state.user.user);
    console.log(user);
    const nav = useNavigate();
    useEffect(() => {
        if (user.isAdmin == 1) {
            nav("/admin")
        }

        if (Object.keys(user).length == 0) {
            nav("/login")
        }

    }, [nav, user])

    const isMobile = useIsMobile()

    return (<div >
        <div className='w-full'>
            <HeaderSec />
            <NavigationSec />
            <div className='grid grid-cols-6 gap-3 xl:h-screen '  >
                {/* User side */}
                <div className={isMobile ? '' : 'col-span-1 h-fit'}>
                    <Index />
                </div>

                <div className={isMobile ? 'col-span-6 h-screen' : 'col-span-5'}>
                    <Outlet />
                </div>
            </div>
        </div>
        <Footer />
    </div>)

}
