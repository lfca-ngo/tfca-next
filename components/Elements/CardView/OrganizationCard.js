require('./organizationCard.less')

import { Card } from 'antd'
import Image from 'next/image'
import React from 'react'

import { DetailButton } from './DetailButton'

export const OrganizationCard = ({ item, onNext }) => {
  const handleNext = () => onNext(item)
  return (
    <Card
      className="content-card organization"
      cover={
        <Image
          layout="fill"
          objectFit="cover"
          src={
            item.hero?.url ||
            'https://images.ctfassets.net/f3bw2oxveb3i/49Z4fNNyNM8i3zKlk2B39z/3f34830efeb89c1751dfa53ede4e449a/placeholder.jpg'
          }
        />
      }
      onClick={handleNext}
    >
      <header>
        <div className="title">{item.name}</div>
        <div className="logo">
          <Image
            layout="fill"
            objectFit="contain"
            objectPosition={'right center'}
            src={item.logo?.url}
          />
        </div>
      </header>
      <main>
        <div className="text">
          <div className="description">{item?.shortDescription}</div>
        </div>
      </main>
      <footer>
        <DetailButton onClick={handleNext} text={'Details'} />
      </footer>
    </Card>
  )
}
