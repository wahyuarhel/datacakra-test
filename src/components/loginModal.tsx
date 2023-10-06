
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { IoEye, IoEyeOff } from 'react-icons/io5';
import { loginAction } from "../redux/action/authAction";
import { useAppDispatch } from "../redux/store/hook";
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

  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)

  useEffect(() => {
    if (!isOpen) {
      setEmail('')
      setEmailError('')
    }
  }, [isOpen])

  const toggleVisibility = () => setShowPassword(!showPassword);

  function onEmailChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value)
    if (!Utils.validateEmail(email)) {
      setEmailError('email address invalid')
    }
    else {
      setEmailError('')
    }

  }
  function onPasswordChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value)
  }

  async function handleLoginSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (isFormValid) {
      await dispatch(loginAction({ email: email, password: password }))
    }
    else {
      console.log('login form invalid')
    }
  }

  const isFormValid: boolean = email !== '' && password !== '';

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      placement="center"
    >
      <ModalContent className="relative">
        {/* {(onClose) => ( */}
        <>
          <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
          <form action="submit" onSubmit={handleLoginSubmit}>
            <ModalBody>
              <Input
                isRequired={email === ''}
                value={email}
                onValueChange={setEmail}
                onChange={(e) => onEmailChanged(e)}
                autoFocus
                label="Email"
                placeholder="Enter your email"
                variant="bordered"
                labelPlacement="outside"
                className="mb-3"
                isClearable
                errorMessage={emailError}
              />
              <Input
                isRequired={password === ''}
                value={password}
                onValueChange={setPassword}
                onChange={e => onPasswordChanged(e)}
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
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
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                type="submit"
                isDisabled={!isFormValid}
                className='bg-tosca'>
                Sign in
              </Button>
            </ModalFooter>
          </form>
        </>
        {/* )} */}
      </ModalContent>
    </Modal>
  );
}


export default LoginModal