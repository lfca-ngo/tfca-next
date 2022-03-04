require('./providerCard.less')

import Icon, {
  CheckCircleOutlined,
  EuroCircleOutlined,
  FileDoneOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  MailOutlined,
  MessageOutlined,
  PhoneOutlined,
  SafetyOutlined,
  TagOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons'
import { Button, Card, Col, Divider, List, Modal, Row, Tabs, Tag } from 'antd'
import React, { useState } from 'react'

import IconCheck from '../../../assets/icons/g-check.svg'
// import useAnalytics from '../../../hooks/useAnalytics'
import ShowMore from '../ShowMore'
import EnergyMix from './EnergyMix'

const { TabPane } = Tabs

const IMG_BASE_URL = process.env.NEXT_PUBLIC_SWITCH_CLIMATE_IMG_URL

const INTL_UNIT = {
  days: 'Tage',
  months: 'Monate',
  weeks: 'Wochen',
  years: 'Jahre',
}

const MinimumTerm = ({ term }) => {
  if (!term) return 'Keine Mindestvertragslaufzeit'
  else return `Mindestvertragslaufzeit: ${term.value} ${INTL_UNIT[term.unit]}`
}

const CancellationPeriod = ({ period }) => {
  if (!period) return 'Keine Kündigungsfrist'
  else return `Kündigungsfrist: ${period.value} ${INTL_UNIT[period.unit]}`
}

const PriceGuarantee = ({ guarantee }) => {
  if (!guarantee) return 'Keine Preisgarantie'
  else return `Preisgarantie bis ${guarantee.date}`
}

export const ProviderCard = ({ energyKwh, item, next }) => {
  const [visible, setVisible] = useState(false)
  // const { trackEvent } = useAnalytics()

  const handleSwitch = () => {
    // trackEvent('tarif_selected', { name: item.name })
    next({ smooth: true })
  }

  const showDetails = () => {
    // trackEvent('tarif_details', { name: item.name })
    setVisible(true)
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
              <img
                className="logo"
                src={`${IMG_BASE_URL}${item.provider?.logo?.url}`}
              />
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
    <Card className="provider-card" style={{ background: 'white' }}>
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

      {/* Modal with detailed Information */}

      <Modal
        destroyOnClose
        footer={[
          <Button key="submit" onClick={() => setVisible(false)} type="primary">
            Schließen
          </Button>,
        ]}
        onCancel={() => setVisible(false)}
        title={
          <div className="provider-logo-container">
            <div className="logo-wrapper">
              <div className="logo">
                <img src={`${IMG_BASE_URL}${item.provider?.logo?.url}`} />
              </div>
            </div>
          </div>
        }
        visible={visible}
        wrapClassName={`modal-md has-top tariff-modal`}
      >
        <Row gutter={12}>
          <Col xs={14}>
            <div className="section-title">
              <ThunderboltOutlined /> Energy Mix
            </div>
            <EnergyMix data={item.energyMix} />
          </Col>
          <Col xs={10}>
            <div className="section-title">
              <EuroCircleOutlined /> Preis
            </div>
            <div className="price">
              <div className="main-price">
                <Tag>
                  <div className="value">{pricePerMonth.toFixed(2)} €</div>
                  <div className="label">pro Monat</div>
                </Tag>
              </div>
              <div className="base-price">
                <Tag>Basis: {(item.price.basePrice / 12).toFixed(2)} €</Tag>
              </div>
              <div className="price-per-kwh">
                <Tag>kwH: {item.price.workingPrice.toFixed(2)}c</Tag>
              </div>
              {item.newCustomerDiscount && (
                <div className="new-customer-discount">
                  <Tag>{item.newCustomerDiscount} € Bonus</Tag>{' '}
                </div>
              )}
            </div>
          </Col>
        </Row>

        <Divider />

        <Row>
          <Col xs={24}>
            <div className="section-title">
              <FileDoneOutlined /> Konditionen
            </div>
            <div className="section-body">
              <List
                className="conditions"
                dataSource={[
                  {
                    component: `Tarif: ${item.name}`,
                    icon: <InfoCircleOutlined />,
                  },
                  {
                    component: <MinimumTerm key="1" term={item.minimumTerm} />,
                  },
                  {
                    component: (
                      <CancellationPeriod
                        key="2"
                        period={item.cancellationPeriod}
                      />
                    ),
                  },
                  {
                    component: (
                      <PriceGuarantee guarantee={item.priceGuarantee} key="3" />
                    ),
                  },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={item.icon || <Icon component={IconCheck} />}
                      description={item.component}
                    />
                  </List.Item>
                )}
              />
            </div>
          </Col>
        </Row>

        <Divider />

        <Row>
          <div className="section-title">
            <InfoCircleOutlined /> Anbieter
          </div>
          <Tabs>
            <TabPane key="1" tab="Info">
              <ShowMore
                maxHeight={280}
                text={
                  <div
                    dangerouslySetInnerHTML={{
                      __html: item.provider.robinWoodRecommendation?.company,
                    }}
                  />
                }
              />
            </TabPane>
            <TabPane key="2" tab="Energiewende">
              <h3>Bewertet von RobinHood.de</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: item.provider.robinWoodRecommendation?.contribution,
                }}
              />
            </TabPane>
            <TabPane key="3" tab="Verflechtungen">
              <div
                dangerouslySetInnerHTML={{
                  __html: item.provider.robinWoodRecommendation?.entanglements,
                }}
              />
            </TabPane>
          </Tabs>
        </Row>

        <Divider />

        {item.labels.length > 0 && (
          <Row>
            <div className="section-title">
              <TagOutlined /> Labels
            </div>
            <Col xs={{ span: 24 }}>
              <div className="labels">
                {item.labels.map((label, i) => (
                  <img
                    key={`label-${i}`}
                    src={`${IMG_BASE_URL}${label.image.url}`}
                  />
                ))}
              </div>
            </Col>
          </Row>
        )}

        <Row>
          <div className="section-title">
            <MessageOutlined /> Kontakt
          </div>
          <Col xs={{ span: 24 }}>
            <div className="section-body">
              <List
                className="conditions"
                dataSource={[
                  {
                    component: (
                      <a
                        href={item.affiliateLink}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Website
                      </a>
                    ),
                    icon: <GlobalOutlined />,
                  },
                  {
                    component: (
                      <a
                        href={item.provider.legalInfo?.termsLink}
                        rel="noreferrer"
                        target="_blank"
                      >
                        Allgemeine Geschäftsbedingungen
                      </a>
                    ),
                    icon: <SafetyOutlined />,
                  },
                  {
                    component: (
                      <a
                        href={`mailto:${item.provider.customerServiceEmail}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {item.provider.customerServiceEmail}
                      </a>
                    ),
                    icon: <MailOutlined />,
                  },
                  {
                    component: (
                      <a
                        href={`tel:${item.provider.customerServicePhone}`}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {item.provider.customerServicePhone}
                      </a>
                    ),
                    icon: <PhoneOutlined />,
                  },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={item.icon || <Icon component={IconCheck} />}
                      description={item.component}
                    />
                  </List.Item>
                )}
              />

              <h4 style={{ marginTop: '20px' }}>Firmensitz</h4>
              <div>{item.provider.legalName}</div>
              {item.provider.address}
            </div>
          </Col>
        </Row>
      </Modal>
    </Card>
  )
}
