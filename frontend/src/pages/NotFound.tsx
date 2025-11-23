import notfound from '../assets/notfound.svg'
export default function NotFound(){
    return (<div className='flex flex-col justify-center items-center h-100'>
        <img className='w-90 ' src={notfound} alt='Not found'/>
        <p className="mt-9">We couldnt find the page you are looking for</p>

        </div>)
}
