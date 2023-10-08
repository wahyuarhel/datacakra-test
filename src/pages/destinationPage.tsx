import { Card, CardFooter } from '@nextui-org/card'
import { CardBody, CardHeader, Pagination } from '@nextui-org/react'
import { useEffect, useMemo } from 'react'
import CirclePercentage from '../components/circlePercentage'
import LoadingModal from '../components/loadingModal'
import { DestinationResponseStatus } from '../enums/destinationEnum'
import { getAllDestination } from '../redux/action/destinationAction'
import { useAppDispatch, useAppSelector } from '../redux/store/hook'
import { BsImage } from 'react-icons/bs'
import { Utils } from '../utils/utlis'

function DestinationPage() {
  const dispatch = useAppDispatch()
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

  return (
    <>
      <LoadingModal isOpen={destinationResponseStatus === DestinationResponseStatus.pending} />
      {destinationResponseData.data !== undefined ?
        <div className='px-5'>
          <div className='container'>
            <div className='grid grid-cols-1 xs:grid-cols-2 gap-x-3 md:grid-cols-3 xl:grid-cols-5 py-5'>
              {destinationResponseData.data.data.map((e, i) =>
                <Card key={i}
                  className='mb-5'
                >
                  {/* <CardHeader>
                </CardHeader> */}
                  {/* <CardBody className='overflow-visible p-0'> */}
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
                    // : <div >image null</div>
                    :
                    <div className='h-[200px] w-auto bg-gray-300 flex justify-center items-center relative'>
                      <BsImage size={50} />
                      <div className='absolute bottom-[-25px] left-[10px] z-10'>
                        <CirclePercentage rate={e.average_rating} />
                      </div>
                    </div>
                  }
                  {/* </CardBody> */}
                  <CardFooter >
                    <div className='pt-3'>
                      <p className=''>{e.title}</p>
                      <p className='font-light text-sm'> {Utils.truncateText({ text: e.description, longText: 200, start: 0 })}</p>
                    </div>
                  </CardFooter>
                </Card>
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
        </div>
        : null
      }
    </>
  )
}

export default DestinationPage