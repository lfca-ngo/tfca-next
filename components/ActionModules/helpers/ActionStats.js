import Icon from '@ant-design/icons'
import { Tag } from 'antd'
import React, { useState } from 'react'

import IconTimer from '../../../assets/icons/counter.svg'
import IconKg from '../../../assets/icons/kg.svg'
import IconUsers from '../../../assets/icons/users.svg'
import { useBlocks } from '../../../hooks/useTranslation'
import { text } from '../../../utils/Text'

const Stat = (props) => {
  return (
    <div className="stats-wrapper">
      <div className="stat">
        <Tag>
          <Icon component={props.icon} /> {props.data}
        </Tag>{' '}
      </div>

      <div className="description-wrapper">
        <div className="description">{props.text}</div>
      </div>
    </div>
  )
}

const minTwoDigits = (n) => {
  return (n < 10 ? '0' : '') + n
}

const ActionStats = (props) => {
  const [isFocus, setIsFocus] = useState(false)
  const minLeft = Math.floor(props.timeLeft / 60)
  const secondsLeft = props.timeLeft % 60
  const time = props.timeLeft ? `${minLeft}:${minTwoDigits(secondsLeft)}` : null

  return (
    <div className="action-stats">
      <Stat
        data={props.otherUsers}
        icon={IconUsers}
        isFocus={isFocus}
        text={text(useBlocks('stats.usersdoingthis'))}
      />

      <Stat
        data={props.timeToImplement}
        icon={IconTimer}
        isFocus={isFocus}
        overwriteData={time}
        text={text(useBlocks('stats.timetoimplement'))}
      />

      <Stat
        data={props.carbonSaved}
        icon={IconKg}
        isFocus={isFocus}
        text={text(useBlocks('stats.carbonsaved'))}
      />
    </div>
  )
}

export default ActionStats
