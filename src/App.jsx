import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { PacientesProvider } from './context/PacientesProvider'

import PublicLayout from './layout/PublicLayout'
import PrivateLayout from './layout/PrivateLayout'

import Login from './pages/Login'
import Registrar from './pages/Registrar'
import ConfirmarCuenta from './pages/ConfirmarCuenta'
import OlvidePassword from './pages/OlvidePassword'
import NuevoPassword from './pages/NuevoPassword'
import Pacientes from './pages/Pacientes'
import Perfil from './pages/Perfil'
import CambiarPassword from './pages/CambiarPassword'

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<PublicLayout/>}>
              <Route index={true} element={<Login/>}/>
              <Route path="/registrar" element={<Registrar/>}/>
              <Route path="/confirmar/:token" element={<ConfirmarCuenta/>}/>
              <Route path="/olvide-password" element={<OlvidePassword/>}/>
              <Route path="/olvide-password/:token" element={<NuevoPassword/>}/>
            </Route>

            <Route path="/admin" element={ <PrivateLayout/> }>
              <Route index={true} element={<Pacientes/>}/>
              <Route path="/admin/perfil" element={<Perfil/>}/>
              <Route path="/admin/perfil/cambiar-password" element={<CambiarPassword/>}/>
            </Route>
          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
