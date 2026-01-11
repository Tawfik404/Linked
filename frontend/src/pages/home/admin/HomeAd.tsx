import { useSelector } from 'react-redux';
import type { RootState } from '@/config/store';
import HeaderSec from '../HeaderSec';
import NavigationSec from './NavigationBar';
import { Outlet, useNavigate } from 'react-router-dom';
import useIsMobile from "useismobile";
import { useEffect } from 'react';
import IndexAd from '../admin/IndexAd';
import Footer from '../Footer';

export default function HomeAd() {

    const user = useSelector((state: RootState) => state.user.user);

    console.log(user);

    const nav = useNavigate();

    useEffect(() => {

        if (Object.keys(user).length == 0) {
            nav("/login")
        }

    }, [nav, user])

    const isMobile = useIsMobile()

    return (<div >

        <div className=' w-full'>

        <HeaderSec />
        <NavigationSec />
        <div className='grid grid-cols-6 gap-3'  >
            {/* Admin side */}
            <div className={isMobile ? '' : 'col-span-1'}>
                <IndexAd />
            </div>

            <div className={isMobile ? 'col-span-6' : 'col-span-5 '}>
                <Outlet />
            </div>
        </div>
        </div>
        <Footer/>
    </div>)

}
