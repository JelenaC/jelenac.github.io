import { useState, useEffect} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import axios from '../api/axios'
import styled from 'styled-components';
import { OrderForm } from '../ui-components/OrderForm';
import useAuth from '../hooks/useAuth';

const ORDER_URL = '/order';

function OrderDetails() {
    const [name, setName] = useState<string>('')
    const [street, setStreet] = useState<string>('')
    const [postCode, setPostCode] = useState<string>('')
    const [city, setCity] = useState<string>('')
    const [nameErrorMessage, setNameErrorMessage] = useState<string>('')
    const [streetErrorMessage, setStreetErrorMessage] = useState<string>('')
    const [postCodeErrorMessage, setPostCodeErrorMessage] = useState<string>('')
    const [cityErrorMessage, setCityErrorMessage] = useState<string>('')
    const [formErrorMessage, setFormErrorMessage] = useState<string>('')
    const [isNameValid, setIsNameValid] = useState<boolean>(false)
    const [isStreetValid, setIsStreetValid] = useState<boolean>(false)
    const [isPostCodeValid, setIsPostCodeValid] = useState<boolean>(false)
    const [isCityValid, setIsCityValid] = useState<boolean>(false)

    const { setAuthToken } = useAuth()
    const navigate = useNavigate()
    const { state } = useLocation()
    const reversedSentences: string[] = state

    useEffect(() => {
        setNameErrorMessage('')
    }, [name])

    useEffect(() => {
        setStreetErrorMessage('')
    }, [street])

    useEffect(() => {
        setPostCodeErrorMessage('')
    }, [postCode])

    useEffect(() => {
        setCityErrorMessage('')
    }, [city])
    
    function handleNameChange(event: React.ChangeEvent<HTMLInputElement>){
        setName(event.target.value)
    }

    function handleStreetChange(event: React.ChangeEvent<HTMLInputElement>){
        setStreet(event.target.value)
    }

    function handlePostCodeChange(event: React.ChangeEvent<HTMLInputElement>){
        setPostCode(event.target.value)
    }

    function handleCityChange(event: React.ChangeEvent<HTMLInputElement>){
        setCity(event.target.value)
    }

    function validateName(value: string){
        if (value.trim() === '') {
            setNameErrorMessage('Name is required');
            setIsNameValid(false)
            return false
        } else if (!/^[a-zA-Z]{2,}(?: [a-zA-Z]+){0,2}$/.test(value.trim())) {
            setNameErrorMessage('Name must have at least two letters')
            setIsNameValid(false)
            return false
        } else {
            setIsNameValid(true)
            setNameErrorMessage('')
            return true
        }
    }

    function validateStreet(value: string){
        if (value.trim() === "") {
            setStreetErrorMessage("Street is required");
            setIsStreetValid(false)
        } else {
            setIsStreetValid(true)
            setStreetErrorMessage("")
        }
    }
    

    function validatePostCode(value: string){
        if (value.trim() === "") {
            setPostCodeErrorMessage('Post code is required')
            setIsPostCodeValid(false)
        } else if (!/^\d{5}$/.test(value.trim())) {
            setPostCodeErrorMessage('Post code must be a 5 digits number')
            setIsPostCodeValid(false)
            return false
        } else {
            setIsPostCodeValid(true)
            setPostCodeErrorMessage("")
        }
    }

    function validateCity(value: string){
        if (value.trim() === "") {
            setCityErrorMessage("City is required");
            setIsCityValid(false)
        } else {
            setIsCityValid(true)
            setCityErrorMessage("")
        }
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
        event.preventDefault()
        if(!isNameValid){
            validateName(name)
            return null
        }
        if(!isStreetValid){
            validateStreet(street)
            return null
        }
        if(!isPostCodeValid){
            validatePostCode(postCode)
            return null
        }
        if(!isCityValid){
            validateCity(city)
            return null
        }

        try {
            await axios.post(ORDER_URL, { reversedSentences, name, street, postCode:parseInt(postCode), city })
            navigate("/order-confirmation", { replace: true })
        } catch (error: any) {
            if (!error?.response) {
                setFormErrorMessage('No Server Response');
            } else if (error.response?.status === 400) {
                setFormErrorMessage('Provided data is not correct');
            } else if (error.response?.status === 401) {
                setAuthToken('')
                localStorage.setItem('token', '')
                navigate('/login', { replace: true })
            } else {
                setFormErrorMessage('Order Sentences Failed :(');
            }
        }
    }

    return (
        <ContentWrapper>
            <h1>Almost there!</h1>
            <h2>Let's send in the sentences you ordered...</h2>
            <p>Please fill out your information!</p>
            <OrderForm 
                onSubmit={handleSubmit}
                name={name}
                nameLabel={'Name: *'}
                nameError={nameErrorMessage}
                street={street}
                streetLabel={'Street: *'}
                streetError={streetErrorMessage}
                postCode={postCode}
                postCodeLabel={'Post code: *'}
                postCodeError={postCodeErrorMessage}
                city={city}
                cityLabel={'City: *'}
                cityError={cityErrorMessage}
                buttonLabel={'Send order'}
                onNameChange={handleNameChange}
                onStreetChange={handleStreetChange}
                onPostCodeChange={handlePostCodeChange} 
                onCityChange={handleCityChange} 
                onValidateName={() => validateName(name)}
                onValidateStreet={() => validateStreet(street)}
                onValidatePostCode={()=>validatePostCode(postCode)} 
                onValidateCity={()=>validateCity(city)}
                formError={formErrorMessage}/>
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
`;