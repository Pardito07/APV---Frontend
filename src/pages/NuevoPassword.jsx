import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

const NuevoPassword = () => {

  const navigate = useNavigate();
  const params = useParams();
  const { token } = params;

  const [ password, setPassword ] = useState('');
  const [ alerta, setAlerta ] = useState({});

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }
    }

    comprobarToken();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if(password === ''){
      setAlerta({
        msg: 'La contraseña es obligatoria',
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

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password/${token}`, { password });
      setAlerta({
        msg: data.msg,
        error: false
      });

      setTimeout(() => {
        setAlerta({});
        navigate('/');
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const { msg, error } = alerta;

  return (
    <div className='grid md:grid-cols-2 items-center'>
      <h1 className='text-5xl text-center md:text-left text-indigo-600 capitalize font-black md:w-3/4 mx-auto'>Reestablece tu contraseña y no pierdas acceso a tus <span className='text-black'>pacientes</span></h1>

      <form
        onSubmit={handleSubmit}
        className='bg-white shadow-lg rounded-lg px-4 py-12 mt-5 md:mt-0 lg:w-3/4 md:mx-auto'
      >
        { msg && <Alerta alerta={alerta}/> }

        { !error && (
          <>
            <div className='mb-5'>
              <label
                htmlFor="password"
                className='uppercase text-md text-gray-700 font-bold mb-2 block'
              >Nueva Contraseña</label>
              <input
                type="password"
                id='password'
                placeholder='Tu Nueva Contraseña'
                className='w-full bg-gray-100 p-2 placeholder-gray-500 rounded-md'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <input
            type="submit"
            value="Cambiar Contraseña"
            className='bg-indigo-600 uppercase text-white rounded-lg py-3 px-7 font-bold text-sm w-full md:w-auto hover:bg-indigo-700 cursor-pointer transition-colors'
            />
          </>
        )}

        
      </form>
    </div>
  )
}

export default NuevoPassword