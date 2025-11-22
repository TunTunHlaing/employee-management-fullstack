import React from 'react'

const HeaderCard = ({name, count}) => {
  return (
    <div className='flex flex-col border rounded-lg'>
      <p>{name}</p>
      <p>{count}</p>
    </div>
  )
}

export default HeaderCard
