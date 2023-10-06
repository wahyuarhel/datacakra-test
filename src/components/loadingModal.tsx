import { CircularProgress } from '@nextui-org/react'
import React from 'react'

interface LoadingModalProp {
  isOpen: boolean
}
const LoadingModal = (props: LoadingModalProp) => {
  const {
    isOpen = false
  } = props
  return (
    isOpen ?
      <div className='fixed top-0 bottom-0 left-0 right-0 z-[10001] w-full h-[100vh] flex items-center justify-center bg-black/30'>
        <CircularProgress aria-label='Loading...' size='lg' />
      </div>
      : <></>
  )
}

export default LoadingModal