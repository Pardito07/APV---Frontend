import { Outlet } from "react-router-dom"

const PublicLayout = () => {
  return (
    <main className="flex place-items-center min-h-screen container mx-auto">
      <Outlet/>
    </main>
  )
}

export default PublicLayout