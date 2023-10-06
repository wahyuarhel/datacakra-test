import { Button, Input } from '@nextui-org/react'

const LoginPage = () => {

  function onSubmitLogin() {
    console.log('onSubmitLogin')
  }
  return (
    <div className='container mx-auto'>
      <form onSubmit={onSubmitLogin}>
        <Input type='email' label='Email' />
        <Input type='password' label='Password' />
        <Button color='primary' onClick={onSubmitLogin}>Login</Button>
      </form>
    </div>
  )
}

export default LoginPage