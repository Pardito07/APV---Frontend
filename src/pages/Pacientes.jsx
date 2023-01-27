import FormularioPaciente from "../components/FormularioPaciente"
import ListadoPacientes from "../components/ListadoPacientes"
import usePacientes from "../hooks/usePacientes"
import Spinner from "../components/Spinner"

const Pacientes = () => {

  const { pacientes, cargando } = usePacientes();

  if(cargando){
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner/>
      </div>
    )
  }

  return (
    <div className='grid md:grid-cols-2 gap-5'>
        <div className="">
          <div className="text-center">
            <h2 className='font-black text-2xl'>Administrador de Pacientes</h2>
            <p className='mt-5'>Añade tus pacientes y <span className='text-indigo-600'>administralos</span></p>
          </div>
            <FormularioPaciente/>
        </div>

        <div className='mt-10 md:mt-0'>
          <div className="text-center">
            <h2 className='font-black text-2xl'>{ pacientes.length ? 'Listado Pacientes' : 'No Hay Pacientes' }</h2>
            <p className='mt-5'>{ pacientes.length ? 'Administra tus' : 'Comienza agregando pacientes y' } <span className='text-indigo-600'>{ pacientes.length ? 'Pacientes y Citas' : 'aparecerán en este lugar' }</span></p>
          </div>
          <div className="md:h-screen overflow-y-scroll" id="listado">
            { pacientes.map(paciente => <ListadoPacientes key={paciente._id} paciente={paciente}/>) }
          </div>
        </div>
    </div>
  )
}

export default Pacientes