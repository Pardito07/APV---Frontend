import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import clienteAxios from '../config/clienteAxios'
import useAuth from "../hooks/useAuth";

const PacientesContext = createContext();

const PacientesProvider = ({children}) => {

    const { auth, setAuth } = useAuth();

    const navigate = useNavigate();

    const [ id, setId ] = useState(null);
    const [ pacientes, setPacientes ] = useState([]);
    const [ paciente, setPaciente ] = useState({});
    const [ perfil, setPerfil ] = useState({});
    const [ alerta, setAlerta ] = useState({});
    const [ cargando, setCargando ] = useState(true);

    useEffect(() => {
        const obtenerPacientes = async () => {
            setCargando(true);
            try {
                const token = localStorage.getItem('token');
    
                if(!token) {
                    setCargando(false);
                    return;
                }
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
    
                const { data } = await clienteAxios('/pacientes', config);
                setPacientes(data);
                setCargando(false);
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                });
    
                setTimeout(() => {
                    setAlerta({});
                }, 3000);

                setCargando(false);
            }

            setCargando(false);
        }

        obtenerPacientes();
    }, [auth]);

    const obtenerPaciente = async id => {
        try {
            const token = localStorage.getItem('token');

            if(!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/pacientes/${id}`, config);
            setId(data._id);
            setPaciente(data);
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

    const agregarPaciente = async paciente => {

        const { nombre, propietario, email, fechaAlta, sintomas } = paciente;

        try {
            const token = localStorage.getItem('token');

            if(!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/pacientes/agregar', { nombre, propietario, email, fechaAlta, sintomas }, config);
            setPacientes([...pacientes, data]);
            setPaciente({});
            setAlerta({
                msg: 'Paciente agregado correctamente',
                error: false
            });

            setTimeout(() => {
                setAlerta({});
            }, 3000);
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

    const submitEliminarPaciente = id => {
        Swal.fire({
            title: '¿Estás seguro que deseas eliminar este paciente?',
            text: "Los datos no podrán ser recuperados",
            icon: 'warning',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            },
            showCancelButton: true,
            confirmButtonColor: '#4f46e5',
            cancelButtonColor: '#dc2626',
            confirmButtonText: 'Si, eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
                eliminarPaciente(id);
                Swal.fire(
                    'Paciente Eliminado',
                    'El registro del paciente ha sido eliminado correctamente',
                    'success'
                );
            }
          })
    }

    const editarPaciente = async paciente => {

        const { id, nombre, propietario, email, fechaAlta, sintomas } = paciente;

        try {
            const token = localStorage.getItem('token');

            if(!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/pacientes/${id}`, { nombre, propietario, email, fechaAlta, sintomas }, config);

            const pacientesActualizados = pacientes.map(paciente => paciente._id === data._id ? data : paciente);
            setPacientes(pacientesActualizados);
            setPaciente({});
            setId(null)

            setAlerta({
                msg: 'Paciente editado correctamente',
                error: false
            });

            setTimeout(() => {
                setAlerta({});
                setId(null)
            }, 3000);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });

            setTimeout(() => {
                setAlerta({});
                setId(null);
            }, 3000);
        }
    }

    const eliminarPaciente = async id => {
        try {
            const token = localStorage.getItem('token');

            if(!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/pacientes/${id}`, config);
            const pacientesActualizados = pacientes.filter( paciente => paciente._id !== data._id );
            setPacientes(pacientesActualizados);
            setPaciente({});
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

    const obtenerPerfil = async () => {
        setCargando(true);
        try {
            const token = localStorage.getItem('token');

            if(!token) {
                setCargando(false);
                return;
            };

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios('/usuarios/perfil', config);
            setPerfil(data);
            setCargando(false);
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            });

            setCargando(false);

            setTimeout(() => {
                setAlerta({});
            }, 3000);
        }
    }

    const editarPerfil = async datos => {
        const { nombre, sitioweb, telefono, email } = datos;

        try {
            const token = localStorage.getItem('token');
            if(!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put('/usuarios/editar-perfil', { nombre, sitioweb, telefono, email }, config);

            const perfilActualizado = { ...auth, data }
            setAuth(perfilActualizado);

            setAlerta({
                msg: 'Perfil actualizado correctamente',
                error: false
            });

            setPerfil({});

            setTimeout(() => {
                setAlerta({});
            }, 3000);
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

    const cambiarPassword = async password => {
        try {
            const token = localStorage.getItem('token');

            if(!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put('/usuarios/cambiar-password', { password }, config);
            setAlerta({
                msg: data.msg,
                error: false
            });
            
            setTimeout(() => {
                setAlerta({});
                navigate('/admin/perfil');
            }, 3000);
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

    const cerrarSesionPacientes = () => {
        setPaciente({});
        setPacientes([]);
        setAlerta({});
    }

    return (
        <PacientesContext.Provider
            value={{
                setAlerta,
                alerta,
                cargando,
                obtenerPaciente,
                agregarPaciente,
                editarPaciente,
                submitEliminarPaciente,
                pacientes,
                setPacientes,
                paciente,
                id,
                obtenerPerfil,
                editarPerfil,
                perfil,
                cambiarPassword,
                cerrarSesionPacientes
            }}
        >
            { children }
        </PacientesContext.Provider>
    )
}

export { PacientesProvider }
export default PacientesContext;