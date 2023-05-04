import styled from 'styled-components'

export interface ISentenceBlock{
  sentenceLabel: string
  sentence: string
  reversedLabel: string
  reversed: string
}

function SentenceBlock ({ sentenceLabel, sentence, reversedLabel, reversed } : ISentenceBlock){
  return (
    <UiSentenceBlock>
    <Label>{sentenceLabel}</Label>
    <TextOriginal>{sentence}</TextOriginal>
    <Label>{reversedLabel}</Label>
    <TextReversed>{reversed}</TextReversed>
  </UiSentenceBlock>
  )
}

export { SentenceBlock }

const UiSentenceBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 3rem;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  color: #333a4e;
  font-weight: bold;
`;

const TextOriginal = styled.div`
border: none;
border-radius: 0.25rem;
padding: 0.5rem 1rem;
background: rgba(240, 198, 97, 0.2);
font-size: 1rem;
&:focus {
  outline: none;
}
`;

const TextReversed = styled.div`
border: none;
border-radius: 0.25rem;
padding: 0.5rem 1rem;
background: rgba(90, 221, 138, 0.2);
font-size: 1rem;
&:focus {
  outline: none;
}
`;
