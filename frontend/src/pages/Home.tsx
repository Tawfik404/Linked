import { useSelector } from 'react-redux';
import type { RootState } from '../config/store';
import HeaderSec from './home/HeaderSec';
import NavigationSec from './home/NavigationBar';
import Index from './home/Index';
import { Outlet, useNavigate } from 'react-router-dom';
import useIsMobile from "useismobile";
import { useEffect } from 'react';

export default function Home() {
    const selector = useSelector((state: RootState) => state.user.user);
    console.log(selector);
    const nav = useNavigate();
    useEffect(()=>{
        if(Object.keys(selector).length == 0){
            nav("/login")
        }
    },[])
    const isMobile = useIsMobile()


    return (<div className=' w-full'>
        <HeaderSec />
        <NavigationSec />

        <div className='grid grid-cols-6 gap-3'  >
            <div className={isMobile? '': 'col-span-1'}>
            <Index/>

            </div>

            <div className={isMobile? 'col-span-6' : 'col-span-5'}>

            <Outlet />
            </div>
        </div>
    </div>)
 
}
