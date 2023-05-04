import styled from 'styled-components';
import useAuth  from '../hooks/useAuth'
import { Button } from '../ui-components/Button';

function MyProfile() {
  const { setAuthToken } = useAuth()

  function logOut() {
    setAuthToken('');
    localStorage.setItem('token', '');
  }

  return (
    <ContentWrapper>
      <h2>Here is my profile and user info :)</h2>
      <Button children={'Log out'} type={'button'} onClick={logOut}></Button>
    </ContentWrapper>
  );
}
export { MyProfile }

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