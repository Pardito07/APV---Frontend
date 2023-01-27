import { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from "../hooks/useAuth"
import Header from '../components/Header';
import Spinner from '../components/Spinner'

const PrivateLayout = () => {
    const { auth, cargando } = useAuth();

    if(cargando){
        return (
            <div className='min-h-screen flex justify-center items-center'>
                <Spinner/>
            </div>
        )
    };

    return (
        <div>
            { auth._id ? 
                (
                    <main className='bg-gray-100 min-h-screen'>
                        <Header/>
                        <div className='container mx-auto mt-10'>
                            <Outlet/>
                        </div>
                        
                    </main>
                ) : 
                <Navigate to="/"/>
            }
        </div>
    )
}

export default PrivateLayout