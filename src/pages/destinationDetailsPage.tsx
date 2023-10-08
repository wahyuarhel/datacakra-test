import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../redux/store/hook'
import { useEffect, useMemo } from 'react'
import { getDestinationDetailById } from '../redux/action/destinationAction'
import LoadingModal from '../components/loadingModal'
import { DestinationDetailResponseStatus } from '../enums/destinationEnum'
import { Card } from '@nextui-org/react'

const DestinationDetailsPage = () => {
  const { id }: any = useParams()
  const dispatch = useAppDispatch()
  const { destinationDetailResponseData, destinationDetailResponseStatus } = useAppSelector(state => state.destination)
  useEffect(() => {
    dispatch(getDestinationDetailById(id))
  }, [dispatch, id])
  useMemo(() => destinationDetailResponseData, [destinationDetailResponseData])



  if (destinationDetailResponseStatus === DestinationDetailResponseStatus.pending) {
    return <LoadingModal isOpen={destinationDetailResponseStatus === DestinationDetailResponseStatus.pending} />
  }
  return (
    <div>
      <div className={`h-[300px] md:h-[500px]  w-full bg-no-repeat bg-cover bg-[center_center] md:bg-[center_top]`}
        style={{
          backgroundImage: `url(${destinationDetailResponseData?.data?.thumbnail})`
        }}
      >
        <div className='container h-full  hidden md:flex items-end '>
          <div className='backdrop-blur-sm bg-white/30 p-5 rounded-t-lg'>
            <p className='text-xs md:text-base'>
              {destinationDetailResponseData?.data?.description}
            </p>
          </div>
        </div>
      </div>
      <div className='container p-5'>
        <div className='md:hidden'>
          <p className='text-xs md:text-base'>
            {destinationDetailResponseData?.data?.description}
          </p>
        </div>
        <div>
          {destinationDetailResponseData?.data?.reviews.length !== 0 ?
            destinationDetailResponseData?.data?.reviews.map((e, i) =>
              <Card key={i}>
                <div>{e.rating}</div>
                <div>{e.rating}</div>
                <div>{e.description}</div>
              </Card>)
            :
            <div className='p-5'>
              <p className='font-bold text-2xl'>Reviews</p>
              <p>We don't have any reviews for {destinationDetailResponseData?.data?.title}</p>
            </div>}
        </div>
      </div>
    </div>
  )
}

export default DestinationDetailsPage