require('./styles.less')

import { Col, Row, Space, Statistic } from 'antd'
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
        <Col md={{ offset: 3, span: 18 }} xs={24}>
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
      </Row>
      <div className="stats-container">
        <div className="stats-wrapper">
          {elements.map((element, i) => {
            const stat = element?.fields
            return (
              <div className="stat-wrapper" key={`stat-${i}`}>
                <Statistic
                  suffix={stat.suffix}
                  title={stat.label}
                  value={stat.value}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
