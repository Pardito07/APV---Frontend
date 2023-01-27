import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import usePacientes from '../hooks/usePacientes'
import Alerta from '../components/Alerta'
import Spinner from '../components/Spinner'

const Perfil = () => {

  const { obtenerPerfil, editarPerfil, alerta, setAlerta, perfil, cargando } = usePacientes();

  const [ nombre, setNombre ] = useState('');
  const [ sitioWeb, setSitioWeb ] = useState('');
  const [ telefono, setTelefono ] = useState('');
  const [ email, setEmail ] = useState('');

  useEffect(() => {
    if(perfil?.nombre && !cargando){
      setNombre(perfil.nombre);
      setSitioWeb(perfil.sitioweb);
      setTelefono(perfil.telefono === null ? '' : perfil.telefono);
      setEmail(perfil.email);
    }
    obtenerPerfil();
  },[perfil?.nombre]);

  const handleSubmit = async e => {
    e.preventDefault();

    if([ nombre, email ].includes('')){
      setAlerta({
        msg: 'Tu nombre e Email son obligatorios',
        error: true
      });

      setTimeout(() => {
        setAlerta({});
      }, 3000);

      return;
    }

    await editarPerfil({ nombre, sitioweb: sitioWeb, telefono, email });
  }

  if(cargando){
    return (
      <div className='flex min-h-screen justify-center items-center'>
        <Spinner/>
      </div>
    )
  }

  const { msg } = alerta;

  return (
    <>
      <Link
        className='uppercase text-gray-700 text-sm font-bold'
        to="/admin/perfil/cambiar-password"
      >Cambiar Contraseña</Link>
      <h2 className='text-3xl font-black text-center mt-10'>Editar Perfil</h2>
      <p className='mt-5 text-sm text-center'>Modifica tu <span className='text-indigo-600'>información aquí</span></p>

      <form
        onSubmit={handleSubmit}
        className='bg-white px-3 py-5 rounded-md shadow-md w-full md:w-2/3 lg:w-2/5 mx-auto mt-10'
      >
        { msg && <Alerta alerta={alerta}/> }

        <div className='mb-5'>
          <label
            htmlFor="nombre"
            className='uppercase text-gray-700 mb-3 block font-bold'
          >Nombre</label>
          <input
            type="text"
            id='nombre'
            placeholder='Tu Nombre'
            className='w-full p-2 bg-gray-100 rounded-md'
            value={ nombre }
            onChange={ e => setNombre(e.target.value) }
          />
        </div>

        <div className='mb-5'>
          <label
            htmlFor="sitio-web"
            className='uppercase text-gray-700 mb-3 block font-bold'
          >Sitio Web</label>
          <input
            type="text"
            id='sitio-web'
            placeholder='Sitio Web'
            className='w-full p-2 bg-gray-100 rounded-md'
            value={sitioWeb}
            onChange={ e => setSitioWeb(e.target.value) }
          />
        </div>

        <div className='mb-5'>
          <label
            htmlFor="telefono"
            className='uppercase text-gray-700 mb-3 block font-bold'
          >Teléfono</label>
          <input
            type="tel"
            id='telefono'
            placeholder='00000000'
            className='w-full p-2 bg-gray-100 rounded-md'
            value={telefono}
            onChange={ e => setTelefono(e.target.value) }
          />
        </div>

        <div className='mb-5'>
          <label
            htmlFor="email"
            className='uppercase text-gray-700 mb-3 block font-bold'
          >Email</label>
          <input
            type="email"
            id='email'
            placeholder='Tu Email'
            className='w-full p-2 bg-gray-100 rounded-md'
            value={email}
            onChange={ e => setEmail(e.target.value) }
          />
        </div>

        <input
          type="submit"
          value="Actualizar Perfil"
          className='bg-indigo-600 hover:bg-indigo-700 w-full text-white uppercase text-sm p-2 cursor-pointer transition-colors'
        />
      </form>

      <footer className='mt-10'>
        <p className='font-bold text-sm text-center'>APV - Adminstrador de Pacientes de <span className='text-indigo-600'>Veterinaria</span></p>
      </footer>
    </>
  )
}

export default Perfil