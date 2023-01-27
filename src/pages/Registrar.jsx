import { useState } from 'react'
import { Link } from "react-router-dom"
import clienteAxios from '../config/clienteAxios'
import Alerta from '../components/Alerta'

const Registrar = () => {

  const [ nombre, setNombre ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ repetirPassword, setRepetirPassword ] = useState('')
  const [ alerta, setAlerta ] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if([ nombre, email, password, repetirPassword ].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);

      return;
    }

    if(password.length < 6){
      setAlerta({
        msg: 'La contraseña debe de contener al menos 6 caracteres',
        error: true
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);

      return;
    }

    if(password !== repetirPassword){
      setAlerta({
        msg: 'Las contraseñas no coinciden',
        error: true
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);

      return;
    }

    try {
      const { data } = await clienteAxios.post('/usuarios/registrar', { nombre, email, password });
      setAlerta({
        msg: data.msg,
        error: false
      });

      setNombre('');
      setEmail('');
      setPassword('');
      setRepetirPassword('');
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
      <h1 className='text-5xl text-center md:text-left text-indigo-600 capitalize font-black md:w-3/4 mx-auto'>Crea una cuenta y administra tus <span className='text-black'>pacientes</span></h1>

      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-lg rounded-lg px-4 py-12 my-5 md:mt-0 lg:w-3/4 md:mx-auto'
      >
        { msg && <Alerta alerta={alerta}/> }
        <div className='mb-5'>
          <label
            htmlFor="nombre"
            className='uppercase text-md text-gray-700 font-bold block mb-2'
          >Nombre</label>
          <input
            type="text"
            id='nombre'
            placeholder='Tu Nombre'
            className='w-full bg-gray-100 p-2 placeholder-gray-500 rounded-md'
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label
            htmlFor="email"
            className='uppercase text-md text-gray-700 font-bold block mb-2'
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

        <div className='mb-5'>
          <label
            htmlFor="password"
            className='uppercase text-md text-gray-700 font-bold block mb-2'
          >Contraseña</label>
          <input
            type="password"
            id='password'
            placeholder='Tu Contraseña'
            className='w-full bg-gray-100 p-2 placeholder-gray-500 rounded-md bg'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label
            htmlFor="repetir"
            className='uppercase text-md text-gray-700 font-bold block mb-2'
          >Repetir Contraseña</label>
          <input
            type="password"
            id='repetir'
            placeholder='Repite tu Contraseña'
            className='w-full bg-gray-100 p-2 placeholder-gray-500 rounded-md'
            value={repetirPassword}
            onChange={e => setRepetirPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
          className='bg-indigo-600 uppercase text-white rounded-lg py-3 px-7 font-bold text-sm w-full md:w-auto hover:bg-indigo-700 cursor-pointer transition-colors'
        />

        <div className="flex flex-col text-center md:flex-row md:justify-between mt-12">
          <Link
            to="/"
            className="text-sm text-gray-500 mb-3 md:mb-0"
          >¿Ya tienes una cuenta? Inicia Sesión</Link>
          <Link
            to="/olvide-password"
            className="text-sm text-gray-500"
          >Olvide mi contraseña</Link>
        </div>
      </form>
    </div>
  )
}

export default Registrar