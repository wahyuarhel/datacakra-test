import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LocalStorageKey } from '../enums/authEnum';
import { setAuthorized } from '../redux/slice/authSlice';
import { useAppDispatch, useAppSelector } from '../redux/store/hook';
import LoginModal from './loginModal';

const NavbarApp = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { authResponseData } = useAppSelector(state => state.auth)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authorization = localStorage.getItem(LocalStorageKey.token) !== null
  const getUserData = JSON.parse(localStorage.getItem(LocalStorageKey.userData) as string)

  useEffect(() => {
    if (authorization) {
      dispatch(setAuthorized(true))
    }
  }, [dispatch, authorization])

  useEffect(() => {
    if (authResponseData.status) {
      setOpenModal(false)
    }
  }, [authResponseData.status])

  const handleModal = () => {
    setOpenModal((prev) => !prev)
    console.log('handleModal triggered')
  }

  const handleLogOut = () => {
    localStorage.clear()
    setIsMenuOpen(false)
    navigate('/')
  }



  const menuItems = [
    { label: "Destination", path: '/destination' },
    { label: "Review", path: '/review' },
    { label: "Dashboard", path: '/dashboard' },
    { label: "Profile", path: '/profile' },
    { label: getUserData?.email, path: '#' },
    { label: "Log Out", path: '#' },
  ];

  return (
    <>
      <LoginModal isOpen={openModal} onClose={handleModal} />
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        position='sticky'
        classNames={{
          base: 'bg-darkBlue text-white',
          menu: 'bg-darkBlue/80 text-white container'
        }}
      >
        <NavbarContent>
          <NavbarBrand>
            <Link to='/' className="font-bold text-inherit" onClick={() => setIsMenuOpen(false)}>Travel App</Link>
          </NavbarBrand>
        </NavbarContent>

        {authorization &&
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem isActive>
              <Link to="/destination">
                Destination
              </Link>
            </NavbarItem>
          </NavbarContent>}

        {!authorization ?
          <NavbarContent justify="end">
            <NavbarItem>
              <Link to={'#'} onClick={handleModal}>Login / Sign In</Link>
            </NavbarItem>
          </NavbarContent> :
          <NavbarContent justify='end' >
            <NavbarItem className='hidden sm:block'>
              <UserAvatar />
            </NavbarItem>
            <NavbarMenuToggle
              onChange={() => setIsMenuOpen(false)}
              className="sm:hidden"
            />
          </NavbarContent>
        }
        <NavbarMenu className='items-end'>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              {index === menuItems.length - 2 ?
                <div
                  className='flex flex-col items-end mt-1 text-xs'>
                  <p className=''>Login as</p>
                  <p>{item.label}</p>
                </div> :
                index === menuItems.length - 1 ?
                  <p onClick={handleLogOut} className='cursor-pointer text-accountRed mt-12'>{item.label}</p>
                  : <Link to={item.path} onClick={() => setIsMenuOpen(false)}>{item.label}</Link>
              }
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>

  )

  function UserAvatar() {
    return (
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <Avatar showFallback src='https://images.unsplash.com/broken' className='cursor-pointer' />
        </DropdownTrigger>
        <DropdownMenu aria-label="User Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-bold">Signed in as</p>
            <p className="font-bold">{getUserData?.email}</p>
          </DropdownItem>
          <DropdownItem key="settings" >
            Profile
          </DropdownItem>
          <DropdownItem key="logout" color="danger" >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }
}



export default NavbarApp