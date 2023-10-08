import React from 'react'
import { useParams } from 'react-router-dom'

const DestinationDetailsPage = () => {
  const { id } = useParams()


  return (
    <div>DestinationDetailsPage,{id} </div>
  )
}

export default DestinationDetailsPage