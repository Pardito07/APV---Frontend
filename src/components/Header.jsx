import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import usePacientes from '../hooks/usePacientes';

const Header = () => {

    const { cerrarSesion } = useAuth();
    const { cerrarSesionPacientes } = usePacientes();

    const handleCerrarSesion = () => {
        cerrarSesion();
        cerrarSesionPacientes();
        localStorage.removeItem('token');
    }

    return (
        <div className='bg-indigo-600 py-7'>
            <div className='container mx-auto flex flex-col md:flex-row md:justify-between items-center'>
                <h2 className='text-xl text-indigo-300 font-bold text-center'>Administrador de Pacientes de <span className='text-white'>Veterinaria</span></h2>

                <div className='flex flex-col md:flex-row text-center gap-2 md:gap-4 mt-5 md:mt-0'>
                    <Link
                        to="/admin"
                        className='text-white text-sm font-bold uppercase'
                    >Pacientes</Link>
                    <Link
                        to="/admin/perfil"
                        className='text-white text-sm font-bold uppercase'
                    >Perfil</Link>
                    <button
                        onClick={handleCerrarSesion}
                        type='button'
                        className='text-white text-sm font-bold uppercase'
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Header