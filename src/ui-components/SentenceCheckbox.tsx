import { forwardRef } from 'react'
import styled from 'styled-components'

export interface ISentenceCheckbox{
    id: string
    name: string
    className?: string
    value?: string
    checked: boolean
    onChange?: CallableFunction
    disabled?: boolean
    reversedSentence: string
}

const SentenceCheckbox = forwardRef<HTMLInputElement, ISentenceCheckbox>(
    ({ id, name, value, onChange, disabled, checked, reversedSentence}, ref) => {

  function handleOnChange(e: React.FormEvent<HTMLInputElement>) {
      if (onChange) {
        onChange(e)
      }
    }

  return (
    <UiSentenceCheckbox>
      <Sentence htmlFor={name}>{reversedSentence}</Sentence>
      <UiCheckbox
          id={id}
          name={name}
          ref={ref}
          type={'checkbox'}
          onChange={handleOnChange}
          value={value}
          checked={checked}
          disabled={disabled}
      />    
    </UiSentenceCheckbox>
  )
})

export { SentenceCheckbox }

const UiSentenceCheckbox = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  gap: 1rem;
`;

const UiCheckbox = styled.input`
  margin-bottom: 0.5rem;
  color: #333a4e;
  font-weight: bold;
`;

const Sentence = styled.label`
flex: 1;
border: none;
border-radius: 0.25rem;
padding: 0.5rem 1rem;
background: rgba(90, 221, 138, 0.2);
font-size: 1rem;
&:focus {
  outline: none;
}
`;
