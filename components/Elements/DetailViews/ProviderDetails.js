require('./providerDetails.less')

import Icon, {
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
import { Col, Divider, List, Row, Tabs, Tag } from 'antd'
import Image from 'next/image'
import React from 'react'

import IconCheck from '../../../assets/icons/g-check.svg'
import EnergyMix from '../EnergyMix'
import ShowMore from '../ShowMore'

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

export const ProviderDetails = ({ energyKwh, item }) => {
  const pricePerYearInCents =
    item.price.workingPrice * energyKwh + item.price.basePrice || 0
  const pricePerMonthInCents = pricePerYearInCents / 12 || 0
  const pricePerMonth = pricePerMonthInCents / 100 || 0

  return (
    <div className="detail-view provider">
      <Row gutter={12}>
        <div className="provider-logo-container">
          <div className="logo-wrapper">
            <div className="logo">
              <Image
                height={46}
                src={`${IMG_BASE_URL}${item.provider?.logo?.url}`}
              />
            </div>
          </div>
        </div>
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
    </div>
  )
}
