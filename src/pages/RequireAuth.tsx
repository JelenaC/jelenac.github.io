import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

function RequireAuth() {
    const { authToken } = useAuth()
    const location = useLocation()
    return (
        authToken && authToken!==''
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}
export { RequireAuth }
