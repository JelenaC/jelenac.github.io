import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useIsTokenValid from '../hooks/useIsTokenValid'

function RequireAuth() {
    const { authToken } = useAuth()
    const tokenIsValid = useIsTokenValid(authToken)
    const location = useLocation()
    return (
        authToken && authToken!=='' && tokenIsValid
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}
export { RequireAuth }
