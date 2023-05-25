import { Login } from './pages/Login'
import { ReverseSentence } from './pages/ReverseSentence'
import { Layout } from './pages/Layout'
import { NotFound }  from './pages/NotFound'
import { RequireAuth } from './pages/RequireAuth'
import { Routes, Route, Navigate } from 'react-router-dom';
import { MySentences } from './pages/MySentences'
import { MyProfile } from './pages/MyProfile'
import useAuth from './hooks/useAuth'
import { OrderSentences } from './pages/OrderSentences'
import { OrderDetails } from './pages/OrderDetails'
import { OrderConfirmation } from './pages/OrderConfirmation'

function App() {
  const { authToken } = useAuth()
  return (
    <Routes>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <Route path="/" element={<Layout />}>

        {/* public routes */}
        <Route path="/login" element={(authToken && authToken!=='') ? <Navigate to="/" replace /> : <Login />}/>

        {/* protected routes */}
        <Route element={<RequireAuth/>}>
          <Route index element={<ReverseSentence />} />
          <Route path="/" element={<ReverseSentence />} />
          <Route path="my-sentences" element={<MySentences />} />
          <Route path="order-sentences" element={<OrderSentences />} />
          <Route path="order-details" element={<OrderDetails />} />
          <Route path="order-confirmation" element={<OrderConfirmation />} />
          <Route path="my-profile" element={<MyProfile />} />
        </Route>
        {/* display custom 404 */}
        <Route path='/404' element={<NotFound/>} />
        <Route path='*' element={<Navigate replace to='/404'/>} />
      </Route>
    </Routes>
  );
}

export default App
