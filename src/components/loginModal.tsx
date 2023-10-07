
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { loginAction } from "../redux/action/authAction";
import { useAppDispatch, useAppSelector } from "../redux/store/hook";

interface LoginModalProp {
  isOpen: boolean
  onClose(): void
}
const LoginModal = (props: LoginModalProp) => {

  const {
    isOpen = false,
    onClose,
  } = props
  const dispatch = useAppDispatch()
  const { authResponseData } = useAppSelector(state => state.auth)

  const initialLoginForm = {
    email: '',
    password: '',
  }
  const [loginForm, setLoginForm] = useState(initialLoginForm)

  const initialRegisterFormForm = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }
  const [registerForm, setRegisterForm] = useState(initialRegisterFormForm)
  // const [email, setEmail] = useState<string>('')
  // const [username, setUsername] = useState<string>('')
  // const [password, setPassword] = useState<string>('')
  // const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [isRegister, setIsRegister] = useState<boolean>(false)

  useEffect(() => {
    if (!isOpen) {
      setLoginForm(initialLoginForm)
      setRegisterForm(initialRegisterFormForm)
      setIsRegister(false)
      // setEmail('')
      // setUsername('')
      // setConfirmPassword('')
      // setPassword('')
    }
  }, [isOpen])

  useEffect(() => {

  }, [authResponseData])

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  function onEmailChanged(e: React.ChangeEvent<HTMLInputElement>) {
    if (isRegister) {
      setRegisterForm({ ...registerForm, email: e.target.value })
    }
    else {
      setLoginForm({ ...registerForm, email: e.target.value })
    }
    // setEmail(e.target.value)
  }
  function onUsernameChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setRegisterForm({ ...registerForm, username: e.target.value })
    // setEmail(e.target.value)
  }
  function onPasswordChanged(e: React.ChangeEvent<HTMLInputElement>) {
    if (isRegister) {
      setRegisterForm({ ...registerForm, password: e.target.value })
    }
    else {
      setLoginForm({ ...loginForm, password: e.target.value })
    }
    // setPassword(e.target.value)
  }
  function onConfirmPasswordChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setRegisterForm({ ...registerForm, confirmPassword: e.target.value })
    // setConfirmPassword(e.target.value)
  }

  async function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isFormRegisterValid) {
      // const response = await dispatch(loginAction({ email: email, password: password }))
      // return response
    }
    else {
      return await dispatch(loginAction({ email: loginForm.email, password: loginForm.password }))
    }
  }

  function handleChangeForm() {
    setIsRegister(prev => !prev)
    setLoginForm(initialLoginForm)
    setRegisterForm(initialRegisterFormForm)
  }


  const isFormLoginValid: boolean = loginForm.email !== '' && loginForm.password !== '';
  const isFormRegisterValid: boolean = registerForm.email !== '' && registerForm.password !== '' && registerForm.username !== '' && registerForm.confirmPassword !== '';

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="center"
    >
      <ModalContent className="relative">
        <>
          <ModalHeader className="flex flex-col gap-1"> {isRegister ? 'Sign in' : 'Log in'}</ModalHeader>
          <ModalBody>
            <form action="submit" onSubmit={handleLoginSubmit}>
              {isRegister ? <RegisterForm /> : <LoginForm />}
              {!authResponseData.status && <p className="text-accountRed text-xs">{authResponseData?.message}</p>}
              {isRegister ?
                <p className="text-xs text-center mt-5">i have an account, <span className="underline text-lightBlue cursor-pointer" onClick={handleChangeForm}>Login</span></p>
                : <p className="text-xs text-center mt-5">haven't an account ? <span className="underline text-lightBlue cursor-pointer" onClick={handleChangeForm}>Sign in</span></p>
              }
              <div>
              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              type="submit"
              isDisabled={isRegister ? !isFormRegisterValid : !isFormLoginValid}
              className='bg-tosca'>
              Sign in
            </Button>
          </ModalFooter>
        </>
      </ModalContent>
    </Modal>
  );
  function LoginForm() {
    return (
      <div className="flex flex-col gap-3">
        <Input
          isRequired={loginForm.email === ''}
          value={loginForm.email}
          onValueChange={() => setLoginForm}
          onChange={(e) => onEmailChanged(e)}
          autoFocus
          label="Email"
          placeholder="Enter your email"
          variant="bordered"
          labelPlacement="outside"
          isClearable
        />
        <Input
          isRequired={loginForm.password === ''}
          value={loginForm.password}
          onValueChange={() => onPasswordChanged}
          onChange={e => onPasswordChanged(e)}
          endContent={
            <button className="focus:outline-none" type="button" onClick={handleShowPassword}>
              {!showPassword ? (
                <IoEye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          label="Password"
          placeholder="Enter your password"
          type={showPassword ? 'text' : 'password'}
          variant="bordered"
          labelPlacement="outside"
        />
      </div>
    )
  }
  function RegisterForm() {
    return (
      <div className="flex flex-col gap-3">
        <Input
          isRequired={registerForm.username === ''}
          value={registerForm.username}
          onChange={(e) => onUsernameChanged(e)}
          autoFocus
          label="Username"
          placeholder="Enter your username"
          variant="bordered"
          labelPlacement="outside"
          isClearable
        />
        <Input
          isRequired={registerForm.email === ''}
          value={registerForm.email}
          onChange={e => onEmailChanged(e)}
          label="Email"
          placeholder="Enter your email"
          type='text'
          variant="bordered"
          labelPlacement="outside"
          isClearable
        />
        <Input
          isRequired={registerForm.password === ''}
          value={registerForm.password}
          onChange={e => onPasswordChanged(e)}
          endContent={
            <button className="focus:outline-none" type="button" onClick={handleShowPassword}>
              {!showPassword ? (
                <IoEye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          label="Password"
          placeholder="Enter your password"
          type={showPassword ? 'text' : 'password'}
          variant="bordered"
          labelPlacement="outside"
        />
        <Input
          isRequired={registerForm.confirmPassword === ''}
          value={registerForm.confirmPassword}
          onChange={e => onConfirmPasswordChanged(e)}
          endContent={
            <button className="focus:outline-none" type="button" onClick={handleShowConfirmPassword}>
              {!showPassword ? (
                <IoEye className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          label="Confirm Password"
          placeholder="Enter your confirm password"
          type={showPassword ? 'text' : 'password'}
          variant="bordered"
          labelPlacement="outside"
        />
      </div>
    )
  }
}


export default LoginModal