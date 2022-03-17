require('./energyProviderCard.less')

import { CheckCircleOutlined } from '@ant-design/icons'
import { Button, Card, Col, Divider, List, Row } from 'antd'
import React from 'react'

export const EnergyProviderCard = ({ item, onNext }) => {
  const handleNext = () => onNext(item)

  return (
    <Card className="energy-provider-card" style={{ background: 'white' }}>
      <div className="list-small">
        <Row className="basic-tarif-info">
          <Col xs={16}>
            <Row>
              <Col xs={20}>
                <div className="logo">
                  <img className="logo" src={`${item?.logo?.url}`} />
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
              <div className="main-price">- €</div>
              <div className="base-price">Basis: -</div>
              <div className="price-per-kwh">kwH: -</div>
            </div>
          </Col>
        </Row>

        <Divider />

        <Row>
          <Col xs={{ span: 24 }}>
            <List
              className="simple-list advantages"
              dataSource={item?.benefitsCollection?.items}
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
          </Col>
        </Row>

        <Divider />

        <Row style={{ margin: '6px 0' }}>
          <Col xs={24}>
            <div className="actions">
              <Button block onClick={handleNext} type="primary">
                Jetzt wechseln
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
  )
}
