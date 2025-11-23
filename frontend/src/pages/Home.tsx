import { useSelector } from 'react-redux';
import type { RootState } from '../config/store';
import HeaderSec from './home/HeaderSec';
import NavigationSec from './home/NavigationBar';
import Index from './home/Index';
import { Outlet } from 'react-router-dom';
import useIsMobile from "useismobile";

export default function Home() {
    const selector = useSelector((state: RootState) => state.user.user);
    console.log(selector);
    const isMobile = useIsMobile()


    return (<div className=' w-full'>
        <HeaderSec />
        <NavigationSec />

        <div className='grid grid-cols-6'  >
            <Index className='grid-span-2'/>
            <Outlet />
        </div>
    </div>)

}
