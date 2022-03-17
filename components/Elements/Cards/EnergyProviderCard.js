require('./energyProviderCard.less')

import Icon, {
  CheckCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons'
import { Button, Card, Col, Divider, List, Row, Tag } from 'antd'
import React from 'react'

export const EnergyProviderCard = ({ item, onNext }) => {
  const handleSwitch = () => {
    onNext()
  }

  const pricePerYearInCents =
    item.price.workingPrice * energyKwh + item.price.basePrice || 0
  const pricePerMonthInCents = pricePerYearInCents / 12 || 0
  const pricePerMonth = pricePerMonthInCents / 100 || 0
  const advantages = item.advantages.match(/<p>.*?<\/p>/g)

  const BasicInfo = (
    <Row className="basic-tarif-info">
      <Col xs={16}>
        <Row>
          <Col xs={20}>
            <div className="logo">
              <img className="logo" src={`${item.provider?.logo?.url}`} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <div className="tariff">
              <span>Tarif: </span>
              <span className="tariff-name">{item.name}</span>
            </div>
          </Col>
        </Row>
      </Col>

      <Col className="align-right" xs={{ span: 8 }}>
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
      </Col>
    </Row>
  )

  return (
    <Card className="energy-provider-card" style={{ background: 'white' }}>
      <div className="list-small">
        {BasicInfo}

        <Divider />

        <Row>
          <Col xs={{ span: 24 }}>
            <List
              className="simple-list advantages"
              dataSource={advantages}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<CheckCircleOutlined />}
                    description={
                      <div dangerouslySetInnerHTML={{ __html: item }} />
                    }
                  />
                </List.Item>
              )}
            />
            <Button
              className="no-padding"
              icon={<InfoCircleOutlined />}
              onClick={showDetails}
              type="link"
            >
              Tarif Details
            </Button>
          </Col>
        </Row>

        <Divider />

        <Row style={{ margin: '6px 0' }}>
          <Col md={12} xs={12}>
            <div className="labels">
              {item.labels.map((label, i) => (
                <img
                  key={`label-${i}`}
                  src={`${IMG_BASE_URL}${label.image.url}`}
                />
              ))}
            </div>
          </Col>

          <Col xs={12}>
            <div className="actions">
              <Button block onClick={handleSwitch} type="primary">
                Jetzt wechseln
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  )
}
