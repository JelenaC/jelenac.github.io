import React, { useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from '../api/axios'
import styled from 'styled-components'
import useAuth from '../hooks/useAuth';
import { acceptedTypes } from '../ui-components/Input'
import { Form } from '../ui-components/Form'

const ORDER_URL = '/order'

function OrderDetails() {
    const [formValues, setFormValues] = useState({ name: '', street: '', postCode: '', city: '' })
    const [formErrors, setFormErrors] = useState({ name: '', street: '', postCode: '', city: '', formErrorMessage: '' })
    const { setAuthToken } = useAuth()
    const navigate = useNavigate()
    const { state } = useLocation()
    const reversedSentences: string[] = state

    useEffect(() => {
        setFormErrors((prevErrors) => ({ ...prevErrors, name: '' }))
    }, [formValues.name])

    useEffect(() => {
        setFormErrors((prevErrors) => ({ ...prevErrors, street: '' }))
    }, [formValues.street])

    useEffect(() => {
        setFormErrors((prevErrors) => ({ ...prevErrors, postCode: '' }))
    }, [formValues.postCode])

    useEffect(() => {
        setFormErrors((prevErrors) => ({ ...prevErrors, city: '' }))
    }, [formValues.city])

    useEffect(() => {
        setFormErrors((prevErrors) => ({ ...prevErrors, formErrorMessage: '' }))
    }, [formValues.name, formValues.street, formValues.postCode, formValues.city])

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }))
    }

    function validateName(value: string){
        if (value.trim() === '') {
            setFormErrors((prevErrors) => ({ ...prevErrors, name: 'Name is required'}))
            return false
        } else if (!/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/.test(value.trim())) {
            setFormErrors((prevErrors) => ({ ...prevErrors, name: 'Name must have at least two letters and no numbers'}))
            return false
        } else {
            return true
        }
    }

    function validateStreet(value: string){
        if (value.trim() === "") {
            setFormErrors((prevErrors) => ({ ...prevErrors, street: 'Street is required'}))
            return false
        } else {
            return true
        }
    }

    function validatePostCode(value: string){
        if (value.trim() === "") {
            setFormErrors((prevErrors) => ({ ...prevErrors, postCode: 'Post code is required'}))
            return false
        } else if (!/^\d{5}$/.test(value.trim())) {
            setFormErrors((prevErrors) => ({ ...prevErrors, postCode: 'Post code must be a 5 digits number'}))
            return false
        } else {
            return true
        }
    }

    function validateCity(value: string){
        if (value.trim() === "") {
            setFormErrors((prevErrors) => ({ ...prevErrors, city: 'City is required'}))
            return false
        } else if (!/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,1}$/.test(value.trim())) {
            setFormErrors((prevErrors) => ({ ...prevErrors, city: 'Name must have at least one letter and no numbers'}))
            return false
        } else {
            return true
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        const isNameValid = validateName(formValues.name)
        const isStreetValid = validateStreet(formValues.street)
        const isPostCodeValid = validatePostCode(formValues.postCode)
        const isCityValid = validateCity(formValues.city)
        if(!isNameValid || !isStreetValid || !isPostCodeValid || !isCityValid){
            return null
        }
        const { name, street, postCode, city } = formValues
        const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
        try {
            await axios.post(ORDER_URL, { reversedSentences, name, street, postCode:parseInt(postCode), city }, config)
            navigate("/order-confirmation", { replace: true })
        } catch (error: any) {
            if (!error?.response) {
                setFormErrors((prevErrors) => ({ ...prevErrors, formErrorMessage: 'No Server Response'}))
            } else if (error.response?.status === 400) {
                setFormErrors((prevErrors) => ({ ...prevErrors, formErrorMessage: 'Provided data is not correct'}))
            } else if (error.response?.status === 401) {
                setAuthToken('')
                localStorage.setItem('token', '')
                navigate('/login', { replace: true })
            } else {
                setFormErrors((prevErrors) => ({ ...prevErrors, formErrorMessage: 'Order Sentences Failed :('}))
            }
        }
    }

    const formInputs = [
        {label: 'Name: *', type: 'text' as acceptedTypes, name: 'name', value: formValues.name, onBlur:()=>validateName(formValues.name), onChange: handleInputChange, errorMessage: formErrors.name},
        {label: 'Street: *',type: 'text' as acceptedTypes,  name: 'street', value: formValues.street, onBlur:()=>validateStreet(formValues.street), onChange: handleInputChange, errorMessage: formErrors.street},
        {label: 'Post code: *', type: 'text' as acceptedTypes, name: 'postCode', value: formValues.postCode, pattern:'[0-9]{5}', onBlur:()=>validatePostCode(formValues.postCode), onChange: handleInputChange, errorMessage: formErrors.postCode},
        {label: 'City: *', type: 'text' as acceptedTypes, name: 'city', value: formValues.city, onBlur:()=>validateCity(formValues.city), onChange: handleInputChange, errorMessage: formErrors.city}
    ]

    return (
        <ContentWrapper>
            <h1>Almost there!</h1>
            <h2>Let's send in the sentences you ordered...</h2>
            <p>Please fill out your information!</p>
            <Form onSubmit={handleSubmit} formArgs={formInputs} formError={formErrors.formErrorMessage} buttonLabel={'Send order'} />
        </ContentWrapper>
    )
}

export { OrderDetails }


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