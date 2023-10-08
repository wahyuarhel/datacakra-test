import { Card, CardFooter } from '@nextui-org/card'
import { Pagination } from '@nextui-org/react'
import { useEffect, useMemo } from 'react'
import { BsImage } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import CirclePercentage from '../components/circlePercentage'
import LoadingModal from '../components/loadingModal'
import { DestinationResponseStatus } from '../enums/destinationEnum'
import { getAllDestination } from '../redux/action/destinationAction'
import { useAppDispatch, useAppSelector } from '../redux/store/hook'
import { Utils } from '../utils/utlis'

function DestinationPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { destinationResponseData, destinationResponseStatus } = useAppSelector(state => state.destination)

  useEffect(() => {
    dispatch(getAllDestination({ page: 1 }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => { }, [dispatch])
  useMemo(() => destinationResponseData, [destinationResponseData])
  function handleSelectPage(pageNumber: number) {
    dispatch(getAllDestination({ page: pageNumber }))
  }

  function getDestinationDetail(destinationId: number) {
    console.log('getDestinationDetail:', destinationId)
    navigate(`/destination/${destinationId}`, { state: destinationId })
  }

  return (
    <>
      <LoadingModal isOpen={destinationResponseStatus === DestinationResponseStatus.pending} />
      {destinationResponseData.data !== undefined ?
        <div className='container'>
          <div className='grid grid-cols-1 xs:grid-cols-2 gap-x-3 md:grid-cols-3 xl:grid-cols-5 py-10 px-5'>
            {destinationResponseData?.data?.data?.map((e, i) =>
              <div
                key={i}
                onClick={() => getDestinationDetail(e.id)} >
                <Card key={i}
                  className='mb-5 cursor-pointer'
                  onClick={() => getDestinationDetail(e.id)}
                >
                  {e.thumbnail !== null && e.thumbnail !== undefined ?
                    <div className='relative h-[200px]'>
                      <img
                        src={e.thumbnail}
                        alt={e.title}
                        className='object-cover h-full w-full'
                      />
                      <div className='absolute bottom-[-25px] left-[10px] z-10'>
                        <CirclePercentage rate={e.average_rating} />
                      </div>
                    </div>
                    :
                    <div className='h-[200px] w-auto bg-gray-300 flex justify-center items-center relative'>
                      <BsImage size={50} />
                      <div className='absolute bottom-[-25px] left-[10px] z-10'>
                        <CirclePercentage rate={e.average_rating} />
                      </div>
                    </div>
                  }
                  <CardFooter >
                    <div className='pt-3'>
                      <p className=''>{e.title}</p>
                      <p className='font-light text-sm'> {Utils.truncateText({ text: e.description, longText: 80 })}</p>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            )}
          </div>
          <Pagination
            showControls
            total={destinationResponseData.data.last_page}
            initialPage={1}
            size='sm'
            onChange={(e) => handleSelectPage(e)}
            className='my-5'
            classNames={{
              base: 'flex justify-center'
            }}
          />

        </div>
        : null
      }
    </>
  )
}

export default DestinationPage