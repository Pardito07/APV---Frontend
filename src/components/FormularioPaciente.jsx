import { useState, useEffect } from 'react'
import usePacientes from '../hooks/usePacientes';
import Alerta from './Alerta'

const FormularioPaciente = () => {

    const { agregarPaciente, alerta, setAlerta, paciente, id, editarPaciente } = usePacientes();

    const [ mascota, setMascota ] = useState('');
    const [ propietario, setPropietario ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ fechaAlta, setFechaAlta ] = useState('');
    const [ sintomas, setSintomas ] = useState('');

    useEffect(() => {
        if(id){
            setMascota(paciente.nombre);
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFechaAlta(paciente.fechaAlta?.split('T')[0])
            setSintomas(paciente.sintomas)
        }
    }, [id]);

    

    const handleSubmit = async e => {
        e.preventDefault();

        if([ mascota, propietario, email, fechaAlta, sintomas ].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            });

            setTimeout(() => {
                setAlerta({});
            }, 3000);

            return;
        }

        if(id){
            await editarPaciente({ id, nombre:mascota, propietario, email, fechaAlta, sintomas });
        }else {
            await agregarPaciente({ nombre:mascota, propietario, email, fechaAlta, sintomas });
        }
        setMascota('');
        setPropietario('');
        setEmail('');
        setFechaAlta('');
        setSintomas('');
    }

    const { msg } = alerta;

    return (
        <form
            onSubmit={handleSubmit}
            className='bg-white rounded-md shadow-md px-3 py-7 mt-10 lg:w-3/4 mx-auto'
        >
            {msg && <Alerta alerta={alerta}/>}
            <div className='mb-5'>
                <label
                    htmlFor="mascota"
                    className='uppercase text-gray-700 font-bold text-sm mb-1 block'
                >Nombre Mascota
                </label>
                <input
                    type="text"
                    placeholder='Nombre de la Mascota'
                    id='mascota'
                    className='w-full border p-2 rounded-md'
                    value={mascota}
                    onChange={ e => setMascota(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label
                    htmlFor="propietario"
                    className='uppercase text-gray-700 font-bold text-sm mb-1 block'
                >Nombre Propietario
                </label>
                <input
                    type="text"
                    placeholder='Nombre del Propietario'
                    id='propietario'
                    className='w-full border p-2 rounded-md'
                    value={propietario}
                    onChange={ e => setPropietario(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label
                    htmlFor="email"
                    className='uppercase text-gray-700 font-bold text-sm mb-1 block'
                >Email Propietario
                </label>
                <input
                    type="email"
                    placeholder='Email del Propietario'
                    id='email'
                    className='w-full border p-2 rounded-md'
                    value={email}
                    onChange={ e => setEmail(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label
                    htmlFor="fecha-alta"
                    className='uppercase text-gray-700 font-bold text-sm mb-1 block'
                >Fecha Alta
                </label>
                <input
                    type="date"
                    id='fecha-alta'
                    className='w-full border p-2 rounded-md'
                    value={fechaAlta}
                    onChange={ e => setFechaAlta(e.target.value)}
                />
            </div>

            <div className='mb-5'>
                <label
                    htmlFor="sintomas"
                    className='uppercase text-gray-700 font-bold text-sm mb-1 block'
                >Síntomas
                </label>
                <textarea
                    placeholder='Describe los síntomas'
                    id='sintomas'
                    className='w-full border p-2 rounded-md'
                    value={sintomas}
                    onChange={ e => setSintomas(e.target.value)}
                />
            </div>

            <input
                type="submit"
                value={`${ id ? 'Guardar cambios' : 'Agregar Paciente' }`}
                className='w-full bg-indigo-600 text-white font-bold uppercase hover:bg-indigo-700 cursor-pointer p-2 transition-colors'
            />
        </form>
    )
}

export default FormularioPaciente