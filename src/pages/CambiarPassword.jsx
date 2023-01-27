import { useState } from 'react'
import { Link } from 'react-router-dom'
import usePacientes from '../hooks/usePacientes'
import Alerta from '../components/Alerta'

const CambiarPassword = () => {

  const { alerta, setAlerta, cambiarPassword } = usePacientes();

  const [ password, setPassword ] = useState('');
  const [ nuevoPassword, setNuevoPassword ] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    if([ password, nuevoPassword ].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);

      return;
    }

    if(nuevoPassword.length < 6){
      setAlerta({
        msg: 'La nueva contraseña debe de contener al menos 6 caracteres',
        error: true
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);

      return;
    }

    await cambiarPassword(nuevoPassword);
    setPassword('');
    setNuevoPassword('');
  }

  const { msg } = alerta;

  return (
    <>
      <Link
        to="/admin/perfil"
        className='uppercase font-bold text-gray-700'
      >
        Perfil
      </Link>
      <h2 className='text-3xl font-black text-center mt-10'>Cambiar Contraseña</h2>
      <p className='mt-5 text-sm text-center'>Modifica tu <span className='text-indigo-600'>contraseña aquí</span></p>

      <form
        onSubmit={handleSubmit}
        className='bg-white px-3 py-5 rounded-md shadow-md w-full md:w-2/3 lg:w-2/5 mx-auto mt-10'
      >
        { msg && <Alerta alerta={alerta}/> }
        <div className='mb-5'>
          <label
            htmlFor="password"
            className='uppercase text-gray-700 mb-3 block font-bold'
          >Contraseña Actual</label>
          <input
            type="password"
            id='password'
            placeholder='Contraseña Actual'
            className='w-full p-2 bg-gray-100 rounded-md'
            value={password}
            onChange={ e => setPassword(e.target.value) }
          />
        </div>

        <div className='mb-5'>
          <label
            htmlFor="repetir-password"
            className='uppercase text-gray-700 mb-3 block font-bold'
          >Contraseña Nueva</label>
          <input
            type="password"
            id='repetir-password'
            placeholder='Contraseña Nueva'
            className='w-full p-2 bg-gray-100 rounded-md'
            value={nuevoPassword}
            onChange={ e => setNuevoPassword(e.target.value) }
          />
        </div>

        <input
          type="submit"
          value="Actualizar Contraseña"
          className='bg-indigo-600 hover:bg-indigo-700 w-full text-white uppercase text-sm p-2 cursor-pointer transition-colors'
        />
      </form>

      <footer className='mt-10'>
        <p className='font-bold text-sm text-center'>APV - Adminstrador de Pacientes de <span className='text-indigo-600'>Veterinaria</span></p>
      </footer>
    </>
  )
}

export default CambiarPassword