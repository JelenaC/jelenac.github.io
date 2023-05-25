import { Outlet } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import { Navigation } from '../ui-components/Navigation'

function Layout() {
  const { authToken } = useAuth()
  const userIsLoggedIn = authToken && authToken!=='' ? true : false
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