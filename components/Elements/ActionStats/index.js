require('./styles.less')

import {
  CoffeeOutlined,
  LikeOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { Popover, Progress, Tag } from 'antd'
import React from 'react'

import { useContentBlocks } from '../../../hooks'
import { textBlockToString } from '../../../utils'

const STEPS = 5

const Stat = (props) => {
  return (
    <div className="stats-wrapper">
      <div className="stat">
        <Tag>{props.icon}</Tag>{' '}
      </div>

      <div className="description-wrapper">
        <div className="label">{props.text}</div>
        <div className="data">{props.data}</div>
      </div>
    </div>
  )
}

export const ActionStats = (props) => {
  return (
    <div className="action-stats">
      <Stat
        data={props.otherUsers || 0}
        icon={<UsergroupAddOutlined />}
        text={textBlockToString(useContentBlocks('stats.usersdoingthis'))}
      />

      <Stat
        data={
          <Popover
            content={
              <div>
                {textBlockToString(useContentBlocks('stats.popover.impact'))}
                {textBlockToString(props.impactDisclaimer)}
              </div>
            }
            overlayClassName="popover-md"
          >
            <Progress
              percent={props.impact * (100 / STEPS)}
              showInfo={false}
              steps={STEPS}
            />
          </Popover>
        }
        icon={<LikeOutlined />}
        text={textBlockToString(useContentBlocks('stats.impact'))}
      />

      <Stat
        data={
          <Progress
            percent={props.effort * (100 / STEPS)}
            showInfo={false}
            steps={STEPS}
          />
        }
        icon={<CoffeeOutlined />}
        text={textBlockToString(useContentBlocks('stats.effort'))}
      />
    </div>
  )
}
