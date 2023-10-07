import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Link, useNavigate } from 'react-router-dom';
import { LocalStorageKey } from '../enums/authEnum';
import { setAuthorized } from '../redux/slice/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/store/hook';
import LoginModal from './loginModal';

const NavbarApp = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { authResponseData, authorized, authErrorMessage, authResponseStatus } = useAppSelector(state => state.auth)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const authorization = localStorage.getItem(LocalStorageKey.token) !== null

  useEffect(() => {
    if (authorization) {
      dispatch(setAuthorized(true))
    }
  }, [])
  // }, [authorization, dispatch])

  useEffect(() => {
    if (authResponseData.status) {
      setOpenModal(false)
    }
  }, [authResponseData.status])

  const handleModal = () => {
    setOpenModal((prev) => !prev)
  }

  const handleLogOut = () => {
    localStorage.clear()
    navigate('/')
    window.location.reload()
  }

  return (
    <>
      <LoginModal isOpen={openModal} onClose={handleModal} />
      <div className='bg-navy text-white fixed top-0 w-full px-5 z-50'>
        <div className='container m-auto flex items-center py-5'>
          <div className='flex-1'>
            <Link to='/'>
              <p className='font-bold'>Travel App</p>
            </Link>
          </div>
          {/*  //* menu for mobile view */}
          <div className='md:hidden'>
            <GiHamburgerMenu size={30}
              onClick={handleModal}
              className='cursor-pointer' />
          </div>
          {/* //*menu for desktop view */}
          <div className='hidden md:flex items-center gap-5'>
            {authorization ?
              <>
                <Link to='/'>
                  <p>Home</p>
                </Link>
                <Link to='/destination'>
                  <p>Destination</p>
                </Link>
              </> : null
            }
            {!authorization ?
              <p className='cursor-pointer' onClick={handleModal}>Sign in / Login</p>
              :
              <p className='cursor-pointer' onClick={handleLogOut}>Logout</p>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default NavbarApp