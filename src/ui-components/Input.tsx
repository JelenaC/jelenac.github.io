import React, { forwardRef } from 'react'
import styled from 'styled-components'

type acceptedTypes = 'text' | 'email' | 'password' | 'number'

export interface IUiInput{
  type?: acceptedTypes
  label: string
  name: string
  value?: string
  defaultValue?: string
  pattern?: string
  onBlur?: CallableFunction
  onChange?: CallableFunction
  placeholder?: string
  autocomplete?: string
  disabled?: boolean
  errorMessage?: string
  required?: boolean
}

const Input = forwardRef<HTMLInputElement, IUiInput>(
  ({ type = 'text', label, name, value, defaultValue, errorMessage, required, pattern, onBlur, onChange, disabled, placeholder, autocomplete }, ref) => {
    
    function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
      if (onChange) {
        onChange(e)
      }
    }

    function handleOnBlur(e: React.FocusEvent<HTMLInputElement>) {
      if (onBlur) {
        onBlur(e)
      }
    }

    return (
      <InputContainer>
      <Label htmlFor={name}>{label}{required && <i aria-hidden="true">*</i>}</Label>
      <UiInput
        id={name}
        ref={ref}
        type={type}
        value={value}
        defaultValue={defaultValue}
        pattern={pattern}
        onBlur={handleOnBlur}
        onChange={handleOnChange}
        disabled={disabled}
        placeholder={placeholder}
        autoComplete={autocomplete}
        required={required}
        aria-label={label}
        aria-required={required}
        aria-invalid={!!(errorMessage && errorMessage!=='')}
        aria-describedby= {`${name}-error`}
      />
        {errorMessage && errorMessage!=='' && <ErrorMessage id={`${name}-error`} role='alert'>{errorMessage}</ErrorMessage>}
    </InputContainer>
    )
  }
)

export { Input }


const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 70%;
`;

const Label = styled.label`
  text-align: left;
  margin-bottom: 0.5rem;
  color: #333a4e;
  font-weight: bold;
`;

const UiInput = styled.input`
  box-sizing: border-box;
  border: solid 0.063rem #f0c661;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  background: rgba(240, 198, 97, 0.1);
  font-size: 1rem;
  &:focus {
    outline: none;
    box-shadow: 0 0 0.188rem #f0c661;
  }
  &:focus-visible {
    outline: 0.063rem solid rgba(240, 198, 97, 0.1);
    box-shadow: 0 0 0.188rem #f0c661;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover, 
  &:-webkit-autofill:focus, 
  &:-webkit-autofill:active{
      -webkit-box-shadow: 0 0 0 30px rgba(240, 198, 97, 0.1) inset !important;
      transition: background-color 600000s 0s, color 600000s 0s;
  }
`

const ErrorMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  color: #ff0000;
`;
