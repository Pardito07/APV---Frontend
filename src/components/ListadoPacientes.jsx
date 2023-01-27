import usePacientes from "../hooks/usePacientes"
import formatearFecha from '../helpers/fomatearFecha'
import Spinner from "./Spinner";

const ListadoPacientes = ({ paciente }) => {

    const { cargando, submitEliminarPaciente, obtenerPaciente } = usePacientes();

    if(cargando){
        return (
            <div className="min-h-sreen flex justify-center items-center">
                <Spinner/>
            </div>
        )
    }

    const { _id, nombre, propietario, email, fechaAlta, sintomas } = paciente;

    return (
        <div className="bg-white rounded-md shadow-md px-3 py-7 mt-5 w-full mx-auto">
            <p className="uppercase text-indigo-600 font-bold mb-3">Nombre: <span className="font-normal text-gray-700 normal-case">{ nombre }</span></p>

            <p className="uppercase text-indigo-600 font-bold mb-3">Propietario: <span className="font-normal text-gray-700 normal-case">{ propietario }</span></p>

            <p className="uppercase text-indigo-600 font-bold mb-3">Email Contacto: <span className="font-normal text-gray-700 normal-case">{ email }</span></p>

            <p className="uppercase text-indigo-600 font-bold mb-3">Fecha de Alta: <span className="font-normal text-gray-700 normal-case">{ formatearFecha(fechaAlta) }</span></p>

            <p className="uppercase text-indigo-600 font-bold mb-3">Síntomas: <span className="font-normal text-gray-700 normal-case">{ sintomas }</span></p>

            <div className="flex justify-between items-center mt-5">
                <button
                    onClick={() => obtenerPaciente(_id)}
                    type="button"
                    className="bg-sky-600 hover:bg-sky-700 transition-colors px-7 py-2 text-sm font-bold uppercase text-white rounded-md"
                >
                    Editar
                </button>

                <button
                    onClick={ () => submitEliminarPaciente(_id) }
                    type="button"
                    className="bg-red-600 hover:bg-red-700 transition-colors px-7 py-2 text-sm font-bold uppercase text-white rounded-md"
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default ListadoPacientes