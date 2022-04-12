require('./styles.less')

import { Col, Row, Space } from 'antd'
import classNames from 'classnames'
import React from 'react'

import { CallToAction } from '../../Elements/CallToAction'
import { SuperText } from '../../Elements/SuperText'
import { Text } from '../../Elements/Text'

const Content = ({ actions, body, superText, title }) => {
  return (
    <div className="content">
      {superText && <SuperText text={superText} />}
      <h1>{title}</h1>
      <Text block={body} />

      <div className="actions">
        <Space>
          {actions?.map((action, i) => (
            <CallToAction key={`action-${i}`} {...action.fields} />
          ))}
        </Space>
      </div>
    </div>
  )
}

const VideoContainer = ({ src }) => {
  return (
    <div className="video-container">
      <div className="video-wrapper">
        {src && (
          <video controls>
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  )
}

export const VideoText = (props) => {
  const heroVideoUrl = props.assets?.[0]?.fields?.file?.url
  const sectionClassNames = classNames(
    'section-block',
    'video-text',
    props.style
  )

  return (
    <section className={sectionClassNames}>
      <Row className="container-max">
        <Col md={10} xs={24}>
          <VideoContainer src={heroVideoUrl} />
        </Col>
        <Col md={14} xs={24}>
          <Content {...props} />
        </Col>
      </Row>
    </section>
  )
}
