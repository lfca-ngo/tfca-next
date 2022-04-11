require('./styles.less')

import { Col, Row, Space } from 'antd'
import classNames from 'classnames'
import React from 'react'

import { getCustomStyles } from '../../../utils'
import { textBlockToString } from '../../../utils/text'
import { CallToAction } from '../CallToAction'
import { SuperText } from '../SuperText'

export const HeroWithStats = ({
  actions,
  backgroundImage,
  backgroundPosition,
  backgroundSize,
  body,
  elements,
  style,
  superText,
  title,
}) => {
  const customStyles = getCustomStyles(
    backgroundImage,
    backgroundPosition,
    backgroundSize
  )

  return (
    <section
      className={classNames('section-block hero-with-stats', style)}
      style={customStyles}
    >
      <Row className="container-max">
        <Col md={24} xs={24}>
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
        <Col md={24} xs={24}>
          Stats
        </Col>
      </Row>
    </section>
  )
}
