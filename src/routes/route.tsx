import { Route, Routes } from 'react-router-dom'
import Footer from '../components/footer'
import NavbarApp from '../components/navbar'
import { LocalStorageKey } from '../enums/authEnum'
import DestinationPage from '../pages/destinationPage'
import ErrorPage from '../pages/errorPage'
import HomePage from '../pages/homePage'
import ProfilePage from '../pages/profilePage'
import DestinationDetailsPage from '../pages/destinationDetailsPage'
import DashboardPage from '../pages/dashboardPage'
import ReviewPage from '../pages/reviewPage'
import { userRole } from '../constant/userRole'

function RouteApp() {
  const authorized = localStorage.getItem(LocalStorageKey.token) !== null


  return (
    <>
      <NavbarApp />
      <div className='min-h-[calc(100vh-64px)] '>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='*' element={<ErrorPage />} />
          {authorized &&
            <>
              {(userRole.superAdmin || userRole.admin) &&
                <Route path='/dashboard' element={<DashboardPage />} />
              }
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/review' element={<ReviewPage />} />
              <Route path='/destination' element={<DestinationPage />} />
              <Route path='/destination/:id' element={<DestinationDetailsPage />} />
            </>

          }
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default RouteApp