require('./styles.less')

import Icon, { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { Carousel } from 'antd'
import classNames from 'classnames'
import React from 'react'

import BulbIcon from '../../../assets/icons/bulb.svg'
import { textBlockToString } from '../../../utils'

const CustomArrow = ({ className, icon, onClick, style }) => {
  return (
    <div
      className={classNames('custom-arrow', className)}
      onClick={onClick}
      style={style}
    >
      {icon}
    </div>
  )
}

export const TipsCarousel = ({ tips }) => {
  return (
    <div className="tips-carousel">
      <Carousel
        arrows
        dots={false}
        infinite={false}
        nextArrow={<CustomArrow icon={<RightOutlined />} />}
        prevArrow={<CustomArrow icon={<LeftOutlined />} />}
      >
        {tips
          .filter((t) => t)
          .map((tip, i) => (
            <div key={`tip-${i}`}>
              <div className="tip">
                <div className="tip-icon">
                  <Icon component={BulbIcon} />
                </div>
                <div className="tip-description">{textBlockToString(tip)}</div>
              </div>
            </div>
          ))}
      </Carousel>
    </div>
  )
}
