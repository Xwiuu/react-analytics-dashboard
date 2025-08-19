import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function PrivateRoute() {
  const { signed } = useAuth() 
  // Usa nosso hook para ver se o usuário está logado

  return signed ? <Outlet /> : <Navigate to="/" />
}