import { createContext, useState } from 'react'

interface IAuthContext {
    authToken: string
    setAuthToken: (auth: string) => void
}

const AuthContext = createContext<IAuthContext>(null!)

function AuthProvider({ children } : { children: React.ReactNode }) {
    const tokenString = localStorage.getItem('token')
    const [authToken, setAuthToken] = useState<any>(tokenString)
    
    return(
        <AuthContext.Provider value={{authToken, setAuthToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthProvider, AuthContext }