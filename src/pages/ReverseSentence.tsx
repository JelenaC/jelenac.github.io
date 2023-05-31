import React, { useState } from 'react'
import { Button } from '../ui-components/Button'
import { Input } from '../ui-components/Input'
import axios from '../api/axios'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const POST_SENTENCES_URL = '/sentence';

function reverseString(str: string){
  const strArray = str.trim().split(' ')
  const reversed =  strArray.map(el=> el.split('').reverse().join(''))
  return reversed.join(' ')
}

function ReverseSentence() {
  const [sentence, setSentence] = useState<string>('')
  const [reversed, setReversedString] = useState<string>('')
  const [infoMessage, setInfoMessage] = useState<string>('')
  const { setAuthToken } = useAuth()
  const navigate = useNavigate()

  function handleInputChange(e: React.FormEvent<HTMLInputElement>) {
    setSentence(e.currentTarget.value)
  }

  function handleReverseString(str: string) {
    const reversedString = reverseString(str)
    setReversedString(reversedString)
  }

  function deleteReversedSentence(){
    setSentence('')
    setReversedString('')
    setInfoMessage('')
  }

  async function saveReversedSentence(){
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
    try {
        await axios.post(POST_SENTENCES_URL, { sentence, reversed }, config)
        deleteReversedSentence()
    } catch (error: any) {
        if (error.response?.status === 401) {
          setAuthToken('')
          localStorage.setItem('token', '')
          navigate('/login', { replace: true })
        } else {
          setInfoMessage('Fetch sentences failed :(')
      }
    }
  }

  return (
    <ContentWrapper>
      <h2>Let's reverse some sentences.. Whoho :)</h2>
      <SentenceWrapper>
        <SentenceInput><Input value={sentence} onChange={handleInputChange} label={'Type sentence'} name={'reverse-sentence'}></Input></SentenceInput>
        <ButtonWrapper><Button children={'Reverse'} type={'button'} onClick={()=>handleReverseString(sentence)}></Button></ButtonWrapper>
      </SentenceWrapper>
      {reversed && reversed!=='' && 
        <SentenceWrapper>
            <SentenceInput><ReversedSentence data-testid='revSentence'>{reversed}</ReversedSentence></SentenceInput>
            <ButtonWrapper>
              <Button children={'Save'} type={'button'} onClick={saveReversedSentence}></Button>
              <Button children={'Cancel'} type={'button'} onClick={deleteReversedSentence}></Button>
            </ButtonWrapper>
        </SentenceWrapper>
      }
      <InfoMessage>{infoMessage}</InfoMessage>
     </ContentWrapper>
  )
}

export { ReverseSentence, reverseString } 

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    text-align: center;
    padding: 1rem;
    & > h1, & > h2, & > h3, & > p {
        color: #333a4e; 
    }
    @media (min-width: 48em) {
        width: 70%;
        margin: 0 auto;
    }
`

const SentenceWrapper = styled.div`
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin: auto;
    gap: 1rem;
    width: 100%;
    @media (min-width: 48em) {
        width: 70%;
        margin: 0 auto;
    }
`
const ButtonWrapper = styled.div`
    display: flex;
    gap: 0.5rem;
`

const SentenceInput = styled.div`
    flex: 1;
`

const ReversedSentence = styled.div`
    border: nonw
    box-sizing: content-box;
    border-radius: 0.25rem;
    padding: 0.5rem 1rem;
    background: rgba(51,58,78, 0.1);
    font-size: 1rem;
    margin-top: 2rem;
`
const InfoMessage = styled.div`
    margin: 2rem 1rem;
`

