import { Link } from 'react-router-dom'
import styled from 'styled-components';

function NotFound() {
  return (
     <ContentWrapper>
      <h1>Oops!</h1>
      <h2>There's nothing here...</h2>
      <RedirectLink to="/">Go back</RedirectLink>
   </ContentWrapper>
  )
}
export { NotFound }

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

const RedirectLink = styled(Link)`
  color: #333a4e; 
  font-weight: bold;
  text-decoration: underline;
  &:hover {
    color: #272b35;
  }
`

