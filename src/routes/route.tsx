import { Route, Routes } from 'react-router-dom'
import Footer from '../components/footer'
import NavbarApp from '../components/navbar'
import HomePage from '../pages/homePage'
import ProfilePage from '../pages/profilePage'

function RouteApp() {
  return (
    <>
      <NavbarApp />
      <div className='pt-[64px] min-h-[calc(100vh-64px)] '>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default RouteApp