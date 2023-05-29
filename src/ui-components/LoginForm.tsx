import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { Input } from "./Input";

interface ILoginForm {
  usernameLabel: string
  username?: string
  passwordLabel: string
  password?: string
  usernameError?: string
  passwordError?: string
  buttonLabel: string
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onUsernameChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onValidateUsername: (event: React.ChangeEvent<HTMLInputElement>) => void
  onValidatePassword: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function LoginForm({
  usernameLabel, 
  username, 
  passwordLabel, 
  password, 
  usernameError, 
  passwordError, 
  buttonLabel, 
  onUsernameChange, 
  onPasswordChange, 
  onValidateUsername, 
  onValidatePassword, 
  onSubmit }: ILoginForm){

  // const usernameInput = useRef<HTMLInputElement>(null)

  // useEffect(() => {
  //   usernameInput?.current && usernameInput.current.focus()
  // }, [])
  
  return (  
    <FormContainer onSubmit={onSubmit} noValidate>
      <Input
        // ref={usernameInput} 
        label={usernameLabel}
        name='email'
        type='email'
        value={username}
        onChange={onUsernameChange}
        onBlur={onValidateUsername}
        errorMessage={usernameError}
        />
      <Input
        label={passwordLabel}
        name='password'
        type='password'
        value={password}
        onChange={onPasswordChange}
        onBlur={onValidatePassword}
        errorMessage={passwordError}
        />
      <input id="waza" type="submit" value="Submit"></input>
    </FormContainer>
  )
}

export { LoginForm }

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
