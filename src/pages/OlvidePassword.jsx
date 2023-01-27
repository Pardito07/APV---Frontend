import { useState } from 'react'
import { Link } from "react-router-dom"
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';

const OlvidePassword = () => {

  const [ email, setEmail ] = useState('');
  const [ alerta, setAlerta ] = useState('')

  const handleSubmit = async e => {
    e.preventDefault();

    if(email === ''){
      setAlerta({
        msg: 'El email es obligatorio',
        error: true
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);

      return;
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/olvide-password', { email });
      setAlerta({
        msg: data.msg,
        error: false
      });

      setEmail('');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    }
  }

  const { msg } = alerta;

  return (
    <div className='grid md:grid-cols-2 items-center'>
      <h1 className='text-5xl text-center md:text-left text-indigo-600 capitalize font-black md:w-3/4 mx-auto'>Recupera tu acceso y no pierdas tus <span className='text-black'>pacientes</span></h1>
      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-lg rounded-lg px-4 py-12 mt-5 md:mt-0 lg:w-3/4 md:mx-auto'
      >
        { msg && <Alerta alerta={alerta}/> }

        <div className='mb-5'>
          <label
            htmlFor="email"
            className='uppercase text-md text-gray-700 font-bold mb-2 block'
          >Email</label>
          <input
            type="email"
            id='email'
            placeholder='Email de Registro'
            className='w-full bg-gray-100 p-2 placeholder-gray-500 rounded-md'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Enviar Instrucciones"
          className='bg-indigo-600 uppercase text-white rounded-lg py-3 px-7 font-bold text-sm w-full md:w-auto hover:bg-indigo-700 cursor-pointer transition-colors'
        />

        <div className="flex flex-col text-center md:flex-row md:justify-between mt-12">
          <Link
            to="/"
            className="text-sm text-gray-500 mb-3 md:mb-0"
          >¿Ya tienes una cuenta? Inicia Sesión</Link>
          <Link
            to="/registrar"
            className="text-sm text-gray-500"
          >¿No tienes una cuenta? Registrate</Link>
        </div>
      </form>
    </div>
  )
}

export default OlvidePassword