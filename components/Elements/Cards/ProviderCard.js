require('./providerCard.less')

import { CheckCircleOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { Button, Card, List, Tag } from 'antd'
import Image from 'next/image'
import React from 'react'

import { Labels } from '../EnergyLabels'

export const ProviderCard = ({ energyKwh, item, onNext, showDetails }) => {
  const handleSwitch = () => onNext()

  const pricePerYearInCents =
    item.price.workingPrice * energyKwh + item.price.basePrice || 0
  const pricePerMonthInCents = pricePerYearInCents / 12 || 0
  const pricePerMonth = pricePerMonthInCents / 100 || 0
  const advantages = item.advantages.match(/<p>.*?<\/p>/g)

  return (
    <Card className="content-card provider">
      <header>
        <div className="basic-tarif-info">
          <div className="logo">
            <Image
              layout="fill"
              objectFit="contain"
              objectPosition={'0 0'}
              src={`${process.env.NEXT_PUBLIC_SWITCH_CLIMATE_IMG_URL}${item.provider?.logo?.url}`}
            />
          </div>
          <div className="tariff">
            <span>Tarif: </span>
            <span className="tariff-name">{item.name}</span>
          </div>
        </div>

        <div className="price">
          <div className="main-price">{pricePerMonth.toFixed(2)} €</div>
          <div className="base-price">
            Basis: {(item.price.basePrice / 12).toFixed(2)} €
          </div>
          <div className="price-per-kwh">
            kwH: {item.price.workingPrice.toFixed(2)}c
          </div>
          {item.newCustomerDiscount && (
            <div className="new-customer-discount">
              <Tag>{item.newCustomerDiscount} € Bonus</Tag>{' '}
            </div>
          )}
        </div>
      </header>

      <main>
        <List
          className="simple-list"
          dataSource={advantages}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<CheckCircleOutlined />}
                description={<div dangerouslySetInnerHTML={{ __html: item }} />}
              />
            </List.Item>
          )}
        />
        <Button
          className="no-padding"
          icon={<InfoCircleOutlined />}
          onClick={() => showDetails(item)}
          type="link"
        >
          Tarif Details
        </Button>
      </main>

      <footer>
        <Labels labels={item.labels} />

        <div className="actions">
          <Button onClick={handleSwitch} size="small" type="primary">
            Jetzt wechseln
          </Button>
        </div>
      </footer>
    </Card>
  )
}
