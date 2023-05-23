import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { Input } from "./Input";

interface ILoginForm {
  nameLabel: string
  name?: string
  streetLabel: string
  street?: string
  postCodeLabel: string
  postCode?: string
  cityLabel: string
  city?: string
  nameError?: string
  streetError?: string
  postCodeError?: string
  cityError?: string
  formError?: string
  buttonLabel: string
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onStreetChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onPostCodeChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onCityChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onValidateName: (event: React.ChangeEvent<HTMLInputElement>) => void
  onValidateStreet: (event: React.ChangeEvent<HTMLInputElement>) => void
  onValidatePostCode: (event: React.ChangeEvent<HTMLInputElement>) => void
  onValidateCity: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function OrderForm({
    nameLabel, 
    name, 
    streetLabel, 
    street, 
    postCodeLabel,
    postCode,
    cityLabel,
    city,
  nameError, 
  streetError, 
  postCodeError,
  cityError,
  formError,
  buttonLabel, 
  onNameChange, 
  onStreetChange, 
  onPostCodeChange,
  onCityChange,
  onValidateName, 
  onValidateStreet, 
  onValidatePostCode,
  onValidateCity,
  onSubmit }: ILoginForm){

  const nameInput = useRef<HTMLInputElement>(null)

  useEffect(() => {
    nameInput?.current && nameInput.current.focus()
  }, [])
  
  return (  
    <FormContainer onSubmit={onSubmit} noValidate>
      <Input
        ref={nameInput} 
        label={nameLabel}
        name='name'
        type='text'
        value={name}
        onChange={onNameChange}
        onBlur={onValidateName}
        errorMessage={nameError}
        />
      <Input
        label={streetLabel}
        name='street'
        type='text'
        value={street}
        onChange={onStreetChange}
        onBlur={onValidateStreet}
        errorMessage={streetError}
        />
        <Input
        label={postCodeLabel}
        name='postCode'
        type='text'
        pattern='[0-9]{5}'
        value={postCode}
        onChange={onPostCodeChange}
        onBlur={onValidatePostCode}
        errorMessage={postCodeError}
        />
        <Input
        label={cityLabel}
        name='city'
        type='text'
        value={city}
        onChange={onCityChange}
        onBlur={onValidateCity}
        errorMessage={cityError}
        />
        <div>{formError}</div>
      <Button children={buttonLabel} type={'submit'}></Button>
    </FormContainer>
  )
}

export { OrderForm }

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap:1.5rem;
  align-items: center;
  margin: 1rem;
  width: calc(100% - 2rem);
  border: 0.063rem solid rgba(51, 58, 78, 0.5);
  border-radius: 0.25rem;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.2);
  padding: 3rem 0;
  @media (min-width: 48em) {
    width: 60%;
    padding: 3rem;
    margin: 2rem auto;
  }
  @media (min-width: 64em) {
    width: 60%;
  }
`;
