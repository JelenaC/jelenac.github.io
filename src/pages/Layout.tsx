import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { Navigation } from '../ui-components/Navigation'
import useIsTokenValid from '../hooks/useIsTokenValid';

function Layout() {
  const { authToken } = useAuth()
  const tokenIsValid = useIsTokenValid(authToken)
  const userIsLoggedIn = authToken && authToken!=='' && tokenIsValid ? true : false
  const links = [
    { name: 'Lets Reverse', url: '/'},    
    { name: 'My reversed', url: '/my-sentences' },    
    { name: 'Order sentences', url: '/order-sentences' },
    { name: 'My profile', url: '/my-profile' } 
  ]

  return (
    <main className="App">
        <Navigation navLinks={links} isLoggedIn={userIsLoggedIn}></Navigation>
        <Outlet />
    </main>
  );
}
export { Layout }