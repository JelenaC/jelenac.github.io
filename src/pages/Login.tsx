import { useState, useEffect} from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from '../api/axios'
import { LoginForm } from '../ui-components/LoginForm';
import styled from 'styled-components';

const LOGIN_URL = '/login';

function Login() {
    const { setAuthToken } = useAuth()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [usernameErrorMessage, setUsernameErrorMessage] = useState<string>('')
    const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('')
    const [isUsernameValid, setIsUsernameValid] = useState<boolean>(false)
    const [isPasswordValid, setIsPasswordValid] = useState<boolean>(false)

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    useEffect(() => {
        setUsernameErrorMessage('')
    }, [username])

    useEffect(() => {
        setPasswordErrorMessage('')
    }, [password])
    
    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>){
        setUsername(event.target.value);
    }

    function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value)
    }

    function validateUsername(value: string){
        if (value.trim() === '') {
            setUsernameErrorMessage('User email is required');
            setIsUsernameValid(false)
            return false
        } else if (!/^[A-Za-z0-9._%+-]{1,64}@(?:[A-Za-z0-9-]{1,63}\.){1,125}[A-Za-z]{2,63}$/.test(value)) {
            setUsernameErrorMessage('Invalid email format')
            setIsUsernameValid(false)
            return false
        } else {
            setIsUsernameValid(true)
            setUsernameErrorMessage('')
            return true
        }
    }

    function validatePassword(value: string){
        if (value.trim() === "") {
            setPasswordErrorMessage("Password is required.");
            setIsPasswordValid(false)
        } else {
            setIsPasswordValid(true)
            setPasswordErrorMessage("")
        }
      }
      

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        if(!isUsernameValid){
            validateUsername(username)
            return null
        }
        if(!isPasswordValid){
            validatePassword(password)
            return null
        }
        try {
            const response = await axios.post(LOGIN_URL, { username, password })
            const accessToken = response?.data?.token
            setAuthToken(accessToken)
            localStorage.setItem('token', accessToken)
            navigate(from, { replace: true })
        } catch (error: any) {
            if (!error?.response) {
                setPasswordErrorMessage('No Server Response');
            } else if (error.response?.status === 400) {
                setPasswordErrorMessage('Missing Username or Password');
            } else if (error.response?.status === 401) {
                setPasswordErrorMessage('This account is unauthorized');
            } else {
                setPasswordErrorMessage('Login Failed');
            }
        }
    }

    return (
        <ContentWrapper>
            <h1>Welcome!</h1>
            <h2>Are you ready to create funtastic stuff together?</h2>
            <p>But first thing first - you need to log in!</p>
            <LoginForm 
                onSubmit={handleSubmit} 
                username={username}
                usernameLabel={'Email: *'}
                usernameError= {usernameErrorMessage}
                password={password}
                passwordLabel={'Password: *'} 
                passwordError= {passwordErrorMessage}
                buttonLabel={'Login'} 
                onPasswordChange={handlePasswordChange} 
                onUsernameChange={handleUsernameChange} 
                onValidateUsername={()=>validateUsername(username)} 
                onValidatePassword={()=>validatePassword(password) }/>
        </ContentWrapper>
    )
}

export { Login }


const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    & > h1, & > h2, & > h3, & > p {
        color: #333a4e; 
    }
    @media (min-width: 48em) {
        width: 70%;
        margin: 0 auto;
    }
    @media (min-width: 64em) {
        width: 50%;
        margin: 0 auto;
    }
`;