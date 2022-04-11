require('./styles.less')

import { Col, Row, Space } from 'antd'
import classNames from 'classnames'
import Image from 'next/image'
import React from 'react'

import { text } from '../../../utils/Text'
import CallToAction from '../CallToAction'
import { SuperText } from '../SuperText'

const Content = ({ actions, body, superText, title }) => {
  return (
    <div className="content">
      {superText && <SuperText text={superText} />}
      <h1>{title}</h1>
      <p>{text(body)}</p>

      <div className="actions">
        <Space>
          {actions.map((action, i) => (
            <CallToAction key={`action-${i}`} {...action.fields} />
          ))}
        </Space>
      </div>
    </div>
  )
}

const ImageContainer = ({ src }) => {
  return (
    <div className="img-container">
      <div className="img-wrapper">
        {src && (
          <Image
            layout="fill"
            objectFit="contain"
            objectPosition={'center'}
            src={`https:${src}`}
          />
        )}
      </div>
    </div>
  )
}

export const ImageText = (props) => {
  const heroImageUrl = props.assets?.[0]?.fields?.file?.url
  const sectionClassNames = classNames(
    'section-block',
    'image-text',
    'container-max',
    props.style
  )
  console.log(props)
  switch (props.variant) {
    case 'image-text':
      return (
        <section className={sectionClassNames}>
          <Row>
            <Col md={10} xs={24}>
              <ImageContainer src={heroImageUrl} />
            </Col>
            <Col md={14} xs={24}>
              <Content {...props} />
            </Col>
          </Row>
        </section>
      )
    default:
      return (
        <section className={sectionClassNames}>
          <Row>
            <Col md={14} xs={24}>
              <Content {...props} />
            </Col>
            <Col md={10} xs={24}>
              <ImageContainer src={heroImageUrl} />
            </Col>
          </Row>
        </section>
      )
  }
}
