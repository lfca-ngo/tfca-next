require('./styles.less')

import Image from 'next/image'
import React from 'react'

export const Labels = ({ labels }) => {
  return (
    <div className="energy-labels">
      {labels.map((label, i) => (
        <div className="label" key={`label-${i}`}>
          <Image
            layout="fill"
            objectFit="contain"
            objectPosition={'0 0'}
            src={`${process.env.NEXT_PUBLIC_SWITCH_CLIMATE_IMG_URL}${label.image.url}`}
          />
        </div>
      ))}
    </div>
  )
}
