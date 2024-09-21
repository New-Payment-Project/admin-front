import React from 'react'

const PageHeader = (props) => {
  return (
    <div>
      <div className='flex flex-col'>
          <h1 className='text-[30px] font-semibold'>{props.title}</h1>
          <p>{props.desc}</p>
        </div>
    </div>
  )
}

export default PageHeader
