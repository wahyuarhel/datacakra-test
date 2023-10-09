import { Button } from '@nextui-org/react';
import { useEffect, useMemo } from 'react';
import LoadingModal from '../components/loadingModal';
import { LoginResponseStatus, RegisterResponseStatus } from '../enums/authEnum';
import { useAppSelector } from '../redux/store/hook';
import { imageFile } from '../constant/images';

const HomePage = () => {
  const { authResponseStatus, registerResponseStatus, authResponseData } = useAppSelector(state => state.auth)
  useEffect(() => {

  }, [authResponseStatus, registerResponseStatus])

  useMemo(() => authResponseData, [authResponseData])

  const Section1 = () => {
    return (
      <div className={`bg-no-repeat bg-cover`} style={{
        backgroundImage: `url(${imageFile.bgHome})`
      }}>
        <div className={`container m-auto py-8 px-4 flex justify-center items-center md:h-[calc(100vh-64px)] `}>
          <div className='max-w-[500px] backdrop-blur-sm bg-white/20 px-2 py-3 md:p-8 rounded-lg'>
            <p className='text-white text-5xl font-bold text-center mb-5 drop-shadow-lg'>Welcome to Travel App</p>
            <p className='text-white text-center mb-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid iste amet perferendis quisquam consequatur doloribus, deserunt rerum est facilis vitae ut veniam optio illum adipisci. Doloribus minus veniam iusto unde!
            </p>
            <div className='flex flex-1 justify-center gap-5'>
              <Button className='bg-tosca text-white'>Get Started</Button>
              <Button variant='bordered' className=' text-white border-white'>Learn More</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  const Section2 = () => {
    return (
      <div>
        Section 2
      </div>
    )
  }
  return (
    <>
      <LoadingModal isOpen={authResponseStatus === LoginResponseStatus.pending || registerResponseStatus === RegisterResponseStatus.pending} />
      <div className=''>
        <Section1 />
        <Section2 />

      </div>
    </>
  )


}

export default HomePage