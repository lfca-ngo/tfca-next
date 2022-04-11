require('./styles.less')

import { Col, Row, Space } from 'antd'
import Image from 'next/image'
import React from 'react'

import { getCustomStyles } from '../../../utils'
import { textBlockToString } from '../../../utils/text'
import { CallToAction } from '../CallToAction'
import { SuperText } from '../SuperText'

export const HeroWithImage = ({
  actions,
  assets,
  backgroundImage,
  backgroundPosition,
  backgroundSize,
  body,
  superText,
  title,
}) => {
  const heroImageUrl = assets?.[0]?.fields?.file?.url
  const customStyles = getCustomStyles(
    backgroundImage,
    backgroundPosition,
    backgroundSize
  )

  return (
    <section className="hero-with-image" style={customStyles}>
      <Row className="container-max">
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
          <div className="img-container">
            <div className="img-wrapper">
              <Image
                layout="fill"
                objectFit="contain"
                objectPosition={'center'}
                src={`https://${heroImageUrl}`}
              />
            </div>
          </div>
        </Col>
      </Row>
    </section>
  )
}
