import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import axios from '../api/axios'
import { Loader } from '../ui-components/Loader'
import { Button } from '../ui-components/Button'
import { SentenceCheckbox } from '../ui-components/SentenceCheckbox'
import { useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const GET_SENTENCES_URL = '/sentence'

export type TReversedSentence = {
  id: string,
  reversed: string
}

function OrderSentences() {
  const [sentences, setSentences] = useState<TReversedSentence[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [infoMessage, setInfoMessage] = useState<string>('')
  const [selectedSentences, setSelectedSentences] = useState<TReversedSentence[]>([])
  const { setAuthToken } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    getSentences()
  }, [])

  const getSentences = async () => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }

    try {
      setLoading(true);
        const response = await axios.get(GET_SENTENCES_URL, config)
        const result = response?.data
        setLoading(false)
        result.length > 0 ? setSentences(result) : setInfoMessage('You do not have any saved reversed sentences')    
    } catch (error: any) {
        if (error.response?.status === 401) {
          setAuthToken('')
          localStorage.setItem('token', '')
          navigate('/login', { replace: true })
      } else {
          setInfoMessage('Fetch sentences failed')
      }
    }
  }

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedCheckboxValue = {id: e.currentTarget.id, reversed: e.currentTarget.value}

    setSelectedSentences(prevSelected => {
      const newArray = [...prevSelected]
      if (newArray.some(item=> item.id===selectedCheckboxValue.id)) {
          return newArray.filter(item => item.id !== selectedCheckboxValue.id)
      } else {
          newArray.push(selectedCheckboxValue)
          return newArray
      }
    })
  }

  function getSelectedSentencesValues(selectedSentences: TReversedSentence[]){
    return selectedSentences.map(sentence => sentence.reversed)  
  }

  function handleOrderSentences(){
    navigate("/order-details", { state: getSelectedSentencesValues(selectedSentences), replace: true })
  }

  if(infoMessage!==''){
    return <NoSentencesMessage>{infoMessage}</NoSentencesMessage>
  }

  if(loading){
    return <LoaderWrapper>Loading sentences: <Loader/> </LoaderWrapper>
  }

  return (
    <Sentences>
      <SentencesList>
        {sentences.map(sentence => {
          const isSelected = selectedSentences && selectedSentences.some(item=>item.id===sentence.id)
          return(
            <SentenceCheckboxWrapper key={sentence.id}>
              <SentenceCheckbox key={sentence.id} id={sentence.id} name={sentence.id} checked={isSelected} onChange={handleOnChange} value={sentence.reversed} reversedSentence={sentence.reversed}/>
            </SentenceCheckboxWrapper>
          )
        })}
      </SentencesList>
      <Button type={'button'} onClick={handleOrderSentences}>Order sentences</Button>
    </Sentences>
  )
}

export { OrderSentences }

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem; 
  gap: 2rem;
  font-weight: bold;
}
`

const Sentences = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 1rem;
  position: relative;
  @media (min-width: 48em) {
    width: 70%;
    margin: 0 auto;
  }
  @media (min-width: 64em) {
    width: 50%;
    margin: 0 auto;
  }
`

const SentencesList = styled.ul`
    display: flex;
    flex-direction: column;
    list-style: none;
    padding: 0;
    margin: 1rem;
`

const SentenceCheckboxWrapper = styled.li``

const NoSentencesMessage = styled.div`
    margin: 2rem 1rem;
`
