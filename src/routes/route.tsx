import { Route, Routes } from 'react-router-dom'
import Footer from '../components/footer'
import NavbarApp from '../components/navbar'
import { LocalStorageKey } from '../enums/authEnum'
import DestinationPage from '../pages/destinationPage'
import ErrorPage from '../pages/errorPage'
import HomePage from '../pages/homePage'
import ProfilePage from '../pages/profilePage'

function RouteApp() {
  const authorized = localStorage.getItem(LocalStorageKey.token) !== null

  return (
    <>
      <NavbarApp />
      <div className='pt-[64px] min-h-[calc(100vh-64px)] '>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<ErrorPage />} />
          {authorized &&
            <>
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/destination' element={<DestinationPage />} />
            </>
          }
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default RouteApp