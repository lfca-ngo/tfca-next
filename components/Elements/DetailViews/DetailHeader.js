import Image from 'next/image'
import React from 'react'

const ImageWrapper = (props) => {
  return (
    <div className="hero-image-wrapper">
      <Image
        layout="fill"
        objectFit="cover"
        src={
          props.item?.hero?.url ||
          'https://images.ctfassets.net/f3bw2oxveb3i/49Z4fNNyNM8i3zKlk2B39z/3f34830efeb89c1751dfa53ede4e449a/placeholder.jpg'
        }
      />
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
