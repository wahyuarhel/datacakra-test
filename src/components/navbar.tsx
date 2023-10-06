import { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useAppSelector } from '../redux/store/hook';
import LoginModal from './loginModal';
import { LoginResponseStatus } from '../enums/authEnum';
import { Link, useNavigate, useNavigation, useRoutes } from 'react-router-dom';
const NavbarApp = () => {
  const navigate = useNavigate()
  const { authResponseStatus, authorized } = useAppSelector(state => state.auth)
  const [openModal, setOpenModal] = useState<boolean>(false)

  useEffect(() => {
    if (authResponseStatus === LoginResponseStatus.pending) {
      setOpenModal(false)
    }
  }, [authResponseStatus])

  function handleModal() {
    setOpenModal((prev) => !prev)
  }

  function handleLogOut() {
    localStorage.clear()
    navigate('/')
    window.location.reload()
  }
  return (
    <>
      <LoginModal isOpen={openModal} onClose={handleModal} />
      <div className='bg-navy text-white fixed top-0 w-full px-5 z-[1000]'>
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
            {authorized ?
              <>
                <Link to='/'>
                  <p>Home</p>
                </Link>
                <Link to='/profile'>
                  <p>Profile</p>
                </Link>
              </> : null
            }
            {!authorized ?
              <p className='cursor-pointer' onClick={handleModal}>Login</p>
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