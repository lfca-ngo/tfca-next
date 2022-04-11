require('./styles.less')

import { Col, Row, Space } from 'antd'
import Image from 'next/image'
import React from 'react'

import { textBlockToString } from '../../../utils/text'
import { CallToAction } from '../CallToAction'
import { SuperText } from '../SuperText'

export const HeroWithImage = ({ actions, assets, body, superText, title }) => {
  const heroImageUrl = assets?.[0]?.fields?.file?.url

  return (
    <section className="hero-with-image container-max">
      <Row>
        <Col md={15} xs={24}>
          <div className="content">
            {superText && <SuperText text={superText} />}
            <h1>{title}</h1>
            <p>{textBlockToString(body)}</p>

            <div className="actions">
              <Space>
                {actions.map((action, i) => (
                  <CallToAction key={`action-${i}`} {...action.fields} />
                ))}
              </Space>
            </div>
          </div>
        </Col>
        <Col md={9} xs={24}>
          <div className="img-wrapper">
            <Image
              layout="fill"
              objectFit="contain"
              objectPosition={'center'}
              src={`https://${heroImageUrl}`}
            />
          </div>
        </Col>
      </Row>
    </section>
  )
}
