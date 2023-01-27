import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [ auth, setAuth ] = useState({});
    const [ cargando, setCargando ] = useState(true);

    useEffect(() => {
        const obtenerPerfil = async () => {
            try {
                const token = localStorage.getItem('token');
    
                if(!token){
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
                setAuth(data);
                setCargando(false);
            } catch (error) {
                console.log(error);
                setCargando(false);
            }
        }

        obtenerPerfil();
    }, []);

    const cerrarSesion = () => {
        setAuth({});
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion
            }}
        >
            { children }
        </AuthContext.Provider>
    )
}

export {AuthProvider}
export default AuthContext;