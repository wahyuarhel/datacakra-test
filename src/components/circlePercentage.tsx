import { CircularProgress } from '@nextui-org/react'
import React from 'react'


type CirclePercentageProp = {
  rate: number
}
const CirclePercentage = (props: CirclePercentageProp) => {
  const {
    rate,
  } = props
  return (
    <div className='bg-darkBlue inline-flex rounded-full p-[2px] text-white'>
      <CircularProgress
        aria-label='loading...'
        value={rate}
        size='sm'
        valueLabel={
          <div className='flex'>
            <p className='text-[12px]'>{rate}</p>
            <p className='text-[7px] font-bold'>%</p>
          </div>
        }
        showValueLabel={true}
        strokeWidth={3}
        classNames={{
          svg: 'w-[40px] h-[40px]',
          indicator: "stroke-accountGreen",
          track: "stroke-accountGreen/10",
          label: ''
        }}
      />
    </div>
  )
}

export default CirclePercentage