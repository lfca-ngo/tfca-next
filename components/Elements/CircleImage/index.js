require('./styles.less')

import Image from 'next/image'
import React from 'react'

export const CircleImage = ({ size, src }) => {
  return (
    <div
      className="rounded-image-wrapper"
      style={{ height: `${size}px`, width: `${size}px` }}
    >
      <Image
        className="image"
        height={size}
        layout="fill"
        objectFit="cover"
        src={src}
        width={size}
      />
    </div>
  )
}
