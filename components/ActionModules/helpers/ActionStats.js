import {
  CoffeeOutlined,
  LikeOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons'
import { Progress, Tag } from 'antd'
import React from 'react'

import { useBlocks } from '../../../hooks/useTranslation'
import { text } from '../../../utils/Text'

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
        data={<Progress percent={100} steps={5} />}
        icon={<LikeOutlined />}
        text={'Effort'}
      />

      <Stat
        data={<Progress percent={50} steps={5} />}
        icon={<CoffeeOutlined />}
        text={'Impact'}
      />
    </div>
  )
}

export default ActionStats
