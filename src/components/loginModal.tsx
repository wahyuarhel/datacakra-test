
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { loginAction, registerAction } from "../redux/action/authAction";
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

  type FormFillType = {
    name: string
    email: string
    password: string
    confirmPassword: string
  }
  const [formFilled, setFormFilled] = useState<FormFillType>({} as FormFillType)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [isRegister, setIsRegister] = useState<boolean>(false)

  useEffect(() => {
    if (!isOpen) {
      setIsRegister(false)
      setFormFilled({ name: '', email: '', password: '', confirmPassword: '' })
      setShowPassword(false)
      setShowConfirmPassword(false)
    }
  }, [isOpen, dispatch])


  useEffect(() => {
  }, [authResponseData])

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  function onUsernameChanged(e: React.ChangeEvent<HTMLInputElement>) {
    // setUsername(e.target.value)
    setFormFilled({ ...formFilled, name: e.target.value })
  }
  function onEmailChanged(e: React.ChangeEvent<HTMLInputElement>) {
    // setEmail(e.target.value)
    setFormFilled({ ...formFilled, email: e.target.value })
  }
  function onPasswordChanged(e: React.ChangeEvent<HTMLInputElement>) {
    // setPassword(e.target.value)
    setFormFilled({ ...formFilled, password: e.target.value })
  }
  function onConfirmPasswordChanged(e: React.ChangeEvent<HTMLInputElement>) {
    // setConfirmPassword(e.target.value)
    setFormFilled({ ...formFilled, confirmPassword: e.target.value })

  }

  async function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isRegister) {
      return await dispatch(registerAction({
        email: formFilled.email,
        name: formFilled.name,
        password: formFilled.password,
        password_confirmation: formFilled.confirmPassword
      }))
    }
    else {
      return await dispatch(loginAction({ email: formFilled.email, password: formFilled.password }))
    }
  }

  function handleChangeForm() {
    setIsRegister(prev => !prev)
    setFormFilled({ name: '', email: '', password: '', confirmPassword: '' })
    setShowPassword(false)
    setShowConfirmPassword(false)
  }


  const isFormLoginValid: boolean = formFilled.email !== '' && formFilled.password !== '';
  const isFormRegisterValid: boolean = formFilled.email !== '' && formFilled.password !== '' && formFilled.name !== '' && formFilled.confirmPassword !== '';

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="center"
    >
      <ModalContent className="relative">
        <>
          <ModalHeader className="flex flex-col gap-1"> {isRegister ? 'Sign in' : 'Log in'}</ModalHeader>
          <form action="submit" onSubmit={handleLoginSubmit}>
            <ModalBody>
              <div className="flex flex-col gap-3">
                {!isRegister ?
                  <>
                    <Input
                      isRequired={formFilled.email === ''}
                      value={formFilled.email}
                      onValueChange={(e) => setFormFilled({ ...formFilled, email: e })}
                      onChange={(e) => onEmailChanged(e)}
                      label="Email"
                      placeholder="Enter your email"
                      variant="bordered"
                      labelPlacement="outside"
                      isClearable
                      autoFocus
                    />
                    <Input
                      isRequired={formFilled.password === ''}
                      value={formFilled.password}
                      onValueChange={(e) => setFormFilled({ ...formFilled, password: e })}
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
                  </>
                  :
                  <>
                    <Input
                      isRequired={formFilled.name === ''}
                      value={formFilled.name}
                      onValueChange={(e) => setFormFilled({ ...formFilled, name: e })}
                      onChange={(e) => onUsernameChanged(e)}
                      label="Username"
                      placeholder="Enter your username"
                      variant="bordered"
                      labelPlacement="outside"
                      isClearable
                      autoFocus
                    />
                    <Input
                      isRequired={formFilled.email === ''}
                      value={formFilled.email}
                      onValueChange={(e) => setFormFilled({ ...formFilled, email: e })}
                      onChange={e => onEmailChanged(e)}
                      label="Email"
                      placeholder="Enter your email"
                      type='text'
                      variant="bordered"
                      labelPlacement="outside"
                      isClearable
                    />
                    <Input
                      isRequired={formFilled.password === ''}
                      value={formFilled.password}
                      onValueChange={(e) => setFormFilled({ ...formFilled, password: e })}
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
                      isRequired={formFilled.confirmPassword === ''}
                      value={formFilled.confirmPassword}
                      onValueChange={(e) => setFormFilled({ ...formFilled, confirmPassword: e })}
                      onChange={e => onConfirmPasswordChanged(e)}
                      endContent={
                        <button className="focus:outline-none" type="button" onClick={handleShowConfirmPassword}>
                          {!showConfirmPassword ? (
                            <IoEye className="text-2xl text-default-400 pointer-events-none" />
                          ) : (
                            <IoEyeOff className="text-2xl text-default-400 pointer-events-none" />
                          )}
                        </button>
                      }
                      label="Confirm Password"
                      placeholder="Enter your confirm password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      variant="bordered"
                      labelPlacement="outside"
                    />
                  </>
                }
              </div>
              {!authResponseData.status && <p className="text-accountRed text-xs">{authResponseData?.message}</p>}
              {isRegister ?
                <p className="text-xs text-center ">i have an account, <span className="underline text-lightBlue cursor-pointer" onClick={handleChangeForm}>Login</span></p>
                : <p className="text-xs text-center ">haven't an account ? <span className="underline text-lightBlue cursor-pointer" onClick={handleChangeForm}>Sign in</span></p>
              }
              <div>
              </div>
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
          </form>
        </>
      </ModalContent>
    </Modal>
  );

}


export default LoginModal