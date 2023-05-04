import { Link } from 'react-router-dom'
import styled from 'styled-components'

function Logotype(){
    return (
        <LogoContainer to={'/'}>
          <LogoDot></LogoDot> Wordsmith
        </LogoContainer>
    )
}

export { Logotype }

const LogoContainer = styled(Link)`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    color: #f0c661;
    font-weight: bold;
    text-decoration: none;
`

const LogoDot = styled.div`
    width: 1rem;
    height: 1rem;
    margin: 0.188rem 0.375;
    border-radius: 50%;
    background-color: #f0c661;
`
