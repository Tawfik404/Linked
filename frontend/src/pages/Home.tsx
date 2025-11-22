import { useSelector } from 'react-redux';
//import { useAppSelector } from '../hooks/useAppSelector.ts'
import type { RootState } from '../config/store';

export default function Home(){
    const selector = useSelector((state : RootState) => state.user.user);
    console.log(selector);
    
    return <></>

}
