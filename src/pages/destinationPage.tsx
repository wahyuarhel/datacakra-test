import { Card, CardFooter } from '@nextui-org/card'
import { CardBody, CardHeader, Pagination, divider } from '@nextui-org/react'
import { useEffect, useMemo } from 'react'
import CirclePercentage from '../components/circlePercentage'
import LoadingModal from '../components/loadingModal'
import { DestinationResponseStatus } from '../enums/destinationEnum'
import { getAllDestination } from '../redux/action/destinationAction'
import { useAppDispatch, useAppSelector } from '../redux/store/hook'

function DestinationPage() {
  const dispatch = useAppDispatch()
  const { destinationResponseData, destinationResponseStatus } = useAppSelector(state => state.destination)

  useEffect(() => {
    async function getData() {
      await dispatch(getAllDestination())
    }
    getData()
  }, [])

  useMemo(() => destinationResponseData, [destinationResponseData])

  return (
    <>
      <LoadingModal isOpen={destinationResponseStatus === DestinationResponseStatus.pending} />
      {destinationResponseData.data !== undefined ?
        <div className='px-5'>
          <div className='container mx-auto'>
            <p>{destinationResponseData.data.current_page}</p>
            <div>

            </div>
            {destinationResponseData.data.data.map((e, i) =>
              <Card key={i}
                className='h-[300px]'
              >
                <CardHeader>
                  <p>{e.title}</p>
                </CardHeader>
                <CardBody>
                  {e.thumbnail !== null && e.thumbnail !== undefined ?
                    <img
                      src={e.thumbnail}
                      alt={e.title}
                    />
                    : <div className='bg-gray-500 w-full h-full'></div>
                  }
                </CardBody>
                <div>
                  <CirclePercentage rate={Math.round(e.average_rating * 10)} />
                </div>
                <CardFooter>
                  <p className='font-light text-sm'> {e.description}</p>
                </CardFooter>
              </Card>
            )}
            <Pagination showControls total={destinationResponseData.data.total} initialPage={1} />
          </div>
        </div>
        : null
      }
    </>
  )
}

export default DestinationPage