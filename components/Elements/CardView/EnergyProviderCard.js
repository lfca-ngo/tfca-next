require('./energyProviderCard.less')

import { Button, Card } from 'antd'
import Image from 'next/image'
import React from 'react'

export const EnergyProviderCard = ({ item, onNext }) => {
  const handleNext = () => onNext(item)

  return (
    <Card className="content-card energy-provider" onClick={handleNext}>
      <div className="header">
        <div className="logo">
          <Image layout="fill" objectFit="contain" src={item.logo?.url} />
        </div>
        <div className="desc">
          <div className="title">{item.name}</div>
          <div className="name">{item.referralUrl}</div>
        </div>
      </div>
      <div className="body-content">
        <div className="actions">
          <Button onClick={handleNext} type="primary">
            Details
          </Button>
        </div>
      </div>
    </Card>
  )
}
