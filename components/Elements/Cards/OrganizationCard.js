require('./organizationCard.less')

import { Card } from 'antd'
import Image from 'next/image'
import React from 'react'

import { text } from '../../../utils/Text'
import { DetailButton } from './DetailButton'

export const OrganizationCard = ({ item, onNext }) => {
  const handleNext = () => onNext(item)
  console.log(item)
  return (
    <Card
      className="content-card organization"
      cover={
        <Image
          layout="fill"
          objectFit="cover"
          src={
            item.hero?.url ||
            'https://images.ctfassets.net/f3bw2oxveb3i/2UHSqYQDCPz0vmbdh8kHj/abb54db139c6568c1399b5ba10a99e1a/350org.jpg'
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
