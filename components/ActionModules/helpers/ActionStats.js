import {
  CoffeeOutlined,
  LikeOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { Progress, Tag } from 'antd'
import React from 'react'

import { useBlocks } from '../../../hooks/useTranslation'
import { text } from '../../../utils/Text'

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

const ActionStats = (props) => {
  return (
    <div className="action-stats">
      <Stat
        data={props.otherUsers}
        icon={<UsergroupAddOutlined />}
        text={text(useBlocks('stats.usersdoingthis'))}
      />

      <Stat
        data={
          <Progress
            percent={props.impact * (100 / STEPS)}
            showInfo={false}
            steps={STEPS}
          />
        }
        icon={<LikeOutlined />}
        text={text(useBlocks('stats.impact'))}
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
        text={text(useBlocks('stats.effort'))}
      />
    </div>
  )
}

export default ActionStats
