import styled, {keyframes} from 'styled-components'

function Loader(){
    return (
        <LoaderDotsContainer>
          <LoaderDot></LoaderDot>
          <LoaderDot></LoaderDot>
          <LoaderDot></LoaderDot>
        </LoaderDotsContainer>
    )
}

export { Loader }

const loaderAnimation = keyframes`
    to {
        opacity: 0.1;
        transform: translateY(-1rem);
    }
`

const LoaderDotsContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    & :nth-child(2){
        animation-delay: 0.2s;
    }
    & :nth-child(3){
        animation-delay: 0.4s;
    }
`

const LoaderDot = styled.div`
    width: 1rem;
    height: 1rem;
    margin: 0.188rem 0.375;
    border-radius: 50%;
    background-color: #333a4e;
    opacity: 1;
    animation: ${loaderAnimation} 0.6s infinite alternate; 
`
