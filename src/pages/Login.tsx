import React, { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from '../api/axios'
import styled from 'styled-components';
import { Form } from '../ui-components/Form'
import { acceptedTypes } from '../ui-components/Input'

const LOGIN_URL = '/login'

function Login() {
    const { setAuthToken } = useAuth()
    const [credentials, setCredentials] = useState({ username: '', password: '' })
    const [errors, setErrors] = useState({ username: '', password: '', formErrorMessage: '' })
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    useEffect(() => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            username: '',
          }));
    }, [credentials.username])

    useEffect(() => {
        setErrors((prevErrors) => ({
            ...prevErrors,
            password: '',
          }));
    }, [credentials.password])

    useEffect(() => {
        setErrors((prevErrors) => ({ ...prevErrors, formErrorMessage: '' }));
    }, [credentials.username, credentials.password])

    function handleCredentialsChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setCredentials((prevCredentials) => ({
          ...prevCredentials,
          [name]: value,
        }))
    }

    function validateUsername(value: string){
        if (value.trim() === '') {
            setErrors((prevErrors) => ({ ...prevErrors, username: 'User email is required' }))
            return false
        } else if (!/^[A-Za-z0-9._%+-]{1,64}@(?:[A-Za-z0-9-]{1,63}\.){1,125}[A-Za-z]{2,63}$/.test(value)) {
            setErrors((prevErrors) => ({ ...prevErrors, username: 'Invalid email format' }))
            return false
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, username: '' }))
            return true
        }
    }

    function validatePassword(value: string){
        if (value.trim() === "") {
            setErrors((prevErrors) => ({ ...prevErrors, password: 'Password is required.' }))
            return false
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, password: '' }))
            return true
        }
    } 

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        const isUsernameValid = validateUsername(credentials.username)
        const isPasswordValid = validatePassword(credentials.password)
        if (!isUsernameValid || !isPasswordValid) {
            return null
        }
        try {
            const response = await axios.post(LOGIN_URL, credentials)
            const accessToken = response?.data?.token
            setAuthToken(accessToken)
            localStorage.setItem('token', accessToken)
            navigate(from, { replace: true })
        } catch (error: any) {
            if (!error?.response) {
                setErrors((prevErrors) => ({ ...prevErrors, formErrorMessage: 'No Server Response'}))
            } else if (error.response?.status === 400) {
                setErrors((prevErrors) => ({ ...prevErrors, formErrorMessage: 'Missing Username or Password'}))
            } else if (error.response?.status === 401) {
                setErrors((prevErrors) => ({ ...prevErrors, formErrorMessage: 'We are sorry but we are not able to authenticate you. Please check your credentials and try to log in again'}))
            } else {
                setErrors((prevErrors) => ({ ...prevErrors, formErrorMessage: 'Login Failed :('}))
            }
        }
    }

    const formInputs = [
        {label: 'Email: *', type: 'text' as acceptedTypes, name: 'username', value: credentials.username, onBlur:()=>validateUsername(credentials.username), onChange: handleCredentialsChange, errorMessage: errors.username},
        {label: 'Password: *',type: 'password' as acceptedTypes,  name: 'password', value: credentials.password, onBlur:()=>validatePassword(credentials.password), onChange: handleCredentialsChange, errorMessage: errors.password}
    ]

    return (
        <ContentWrapper>
            <h1>Welcome!</h1>
            <h2>Are you ready to create funtastic stuff together?</h2>
            <p>But first thing first - you need to log in!</p>
            <Form onSubmit={handleSubmit} formArgs={formInputs} formError={errors.formErrorMessage} buttonLabel={'Login'} />
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
`