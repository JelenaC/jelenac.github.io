import jwt_decode, { JwtPayload }  from "jwt-decode"

const useIsTokenValid = (token: string) => {
    try {
        const decodedToken = jwt_decode<JwtPayload>(token)
        const  tokenExp  = decodedToken.exp
        if(!tokenExp){
            return false
        }
            
        else if (Date.now() >= tokenExp * 1000) {
            return false
        }
        } catch (err) {
            return false
        }
    return true
}

export default useIsTokenValid
