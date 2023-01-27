import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {

  const navigate = useNavigate();
  const params = useParams();
  const { token } = params;

  const [ alerta, setAlerta ] = useState({});

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const { data } = await clienteAxios(`/usuarios/confirmar/${token}`);
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
    confirmarCuenta();
  }, []);

  const { msg } = alerta;

  return (
    <div className='grid md:grid-cols-2 items-center'>
      <h1 className='text-5xl text-center md:text-left text-indigo-600 capitalize font-black md:w-3/4 mx-auto'>Confirma tu cuenta y empiza a administrar tus <span className='text-black'>pacientes</span></h1>

      <div className='bg-white shadow-lg rounded-lg px-4 py-12 my-5 md:mt-0 lg:w-3/4 md:mx-auto'>
        { msg && <Alerta alerta={alerta}/> }
      </div>
    </div>
  )
}

export default ConfirmarCuenta