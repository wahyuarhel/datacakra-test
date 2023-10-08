
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { toast } from "react-toastify";
import { RegisterResponseStatus } from "../enums/authEnum";
import { loginAction, registerAction } from "../redux/action/authAction";
import { useAppDispatch, useAppSelector } from "../redux/store/hook";
import { Utils } from "../utils/utlis";

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
  const { authResponseData, registerResponseData } = useAppSelector(state => state.auth)

  type FormFillType = {
    name: string
    email: string
    password: string
    confirmPassword: string
  }
  const [formFilled, setFormFilled] = useState<FormFillType>({} as FormFillType)
  const [emailErrorText, setEmailErrorText] = useState<string>('')
  const [passwordErrorText, setPasswordErrorText] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [isRegister, setIsRegister] = useState<boolean>(false)

  useEffect(() => {
    if (!isOpen) {
      setIsRegister(false)
      setFormFilled({ name: '', email: '', password: '', confirmPassword: '' })
      setShowPassword(false)
      setShowConfirmPassword(false)
      setPasswordErrorText('')
    }
  }, [isOpen])


  useEffect(() => {
  }, [authResponseData, registerResponseData])

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  function onUsernameChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setFormFilled({ ...formFilled, name: e.target.value })
  }
  function onEmailChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setFormFilled({ ...formFilled, email: e.target.value })
    const isValidEmail = Utils.validateEmail(formFilled.email)
    if (!isValidEmail)
      setEmailErrorText('Email is invalid, Please input valid email!')
    else setEmailErrorText('')
  }
  function onPasswordChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setFormFilled({ ...formFilled, password: e.target.value })
  }
  function onConfirmPasswordChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setFormFilled({ ...formFilled, confirmPassword: e.target.value })
  }

  async function handleSubmitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isRegister) {
      const request = await dispatch(registerAction({
        email: formFilled.email,
        name: formFilled.name,
        password: formFilled.password,
        password_confirmation: formFilled.confirmPassword
      }))
      console.log('request register:', request)
      return request
    }
    else {
      return await dispatch(loginAction({ email: formFilled.email, password: formFilled.password }))
    }
  }

  function handleDisabledButton() {
    if (!isRegister)
      return formFilled.email === '' || formFilled.password === '' || emailErrorText !== ''
    else
      return formFilled.email === '' || formFilled.password === '' || formFilled.name === '' || formFilled.confirmPassword === '' || emailErrorText !== '' || formFilled.password !== formFilled.confirmPassword
  }

  function handleChangeForm() {
    setIsRegister(!isRegister)
    setFormFilled({ name: '', email: '', password: '', confirmPassword: '' })
    setShowPassword(false)
    setShowConfirmPassword(false)
    setPasswordErrorText('')
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="center"
    >
      <ModalContent className="relative">
        <>
          <ModalHeader className="flex flex-col gap-1"> {isRegister ? 'Sign in' : 'Log in'}</ModalHeader>
          <form action="submit" onSubmit={handleSubmitForm}>
            <ModalBody >
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
              {emailErrorText !== '' && <p className="text-xs text-accountRed">*{emailErrorText}</p>}
              {passwordErrorText !== '' && <p className="text-xs text-accountRed">*{passwordErrorText}</p>}
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
                isDisabled={handleDisabledButton()}
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