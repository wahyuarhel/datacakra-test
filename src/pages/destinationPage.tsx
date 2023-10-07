import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/store/hook'
import { getAllDestination } from '../redux/action/destinationAction'
import LoadingModal from '../components/loadingModal'
import { DestinationResponseStatus } from '../enums/destinationEnum'

function DestinationPage() {
  const dispatch = useAppDispatch()
  const { destinationResponseData, destinationResponseStatus } = useAppSelector(state => state.destination)

  useEffect(() => {
    async function getData() {
      await dispatch(getAllDestination())
    }
    getData()
  }, [dispatch])

  return (
    <>
      <LoadingModal isOpen={destinationResponseStatus === DestinationResponseStatus.pending} />
      {destinationResponseData.data !== undefined ?
        <div className='px-5'>
          <div className='container mx-auto'>
            <p>{destinationResponseData.data.current_page}</p>
          </div>
        </div>
        : null
      }
    </>
  )
}

export default DestinationPage