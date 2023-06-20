import React, { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { IUiInput, Input } from './Input'

interface IForm {
    formArgs: IUiInput[]
    formError?: string
    buttonLabel: string
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}

function Form ({ formArgs,  formError, buttonLabel, onSubmit }: IForm){

    const firstInput = useRef<HTMLInputElement>(null)

    useEffect(() => {
        firstInput.current && firstInput.current.focus()
    }, [])

    if(!formArgs || formArgs.length === 0) return null
  
    return (  
        <FormContainer onSubmit={onSubmit} noValidate>
            {formArgs.map((input: IUiInput, index: number) => (
                <Input 
                key={index}
                ref={index===0 ? firstInput : null} 
                label={input.label}
                name={input.name}
                type={input.type}
                value={input.value ?? ''}
                onChange={input.onChange}
                onBlur={input.onBlur}
                errorMessage={input.errorMessage}
            />
            ))}
            {formError ? <FormError>{formError}</FormError> : null}
            <Button children={buttonLabel} type={'submit'}></Button>
        </FormContainer>
    )
}

export { Form }

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
`

const FormError = styled.div`
  color: red;
  font-size: 0.8rem;
  margin: 0.25rem 0;
  color: #ff0000;
  max-width: 85%;
`
