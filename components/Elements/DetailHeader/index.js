import Image from 'next/image'
import React from 'react'

const ImageWrapper = (props) => {
  return (
    <div className="hero-image-wrapper">
      <Image layout="fill" objectFit="cover" src={props.item?.hero?.url} />
    </div>
  )
}

export const DetailHeader = (props) => {
  switch (props.layout) {
    case 'action':
    case 'organization':
      return <ImageWrapper {...props} />
    default:
      return null
  }
}
