import Icon from '@ant-design/icons'
import { Col, Row, Tag } from 'antd'
import React, { useState } from 'react'
import { Link } from 'react-scroll'

import IconTimer from '../../../assets/icons/counter.svg'
import IconKg from '../../../assets/icons/kg.svg'
import IconUsers from '../../../assets/icons/users.svg'
import { useBlocks } from '../../../hooks/useTranslation'
// import { useIsMobile } from '../../../utils/IsMobileProvider'

const Stat = (props) => {
  // const animation = useSpring({
  //   from: { number: 0 },
  //   number: props.isFocus ? props.data : 0,
  // })
  // const { isMobile } = useIsMobile()

  return (
    <div className="stats-wrapper">
      <div className="stat">
        <Tag>
          <Icon component={props.icon} /> {props.data}
          {/* {isMobile ? (
            props.data
          ) : (
            <animated.span>
              {props.overwriteData ||
                animation.number.interpolate((el) => el.toFixed(0))}
            </animated.span>
          )} */}
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
      {/* <Link
        className="animation-activator"
        activeClass="active"
        // containerId="scroll-container"
        onSetActive={() => setIsFocus(true)}
        // spy={true}
        to={props.name}
      /> */}

      <Stat
        data={props.otherUsers}
        icon={IconUsers}
        isFocus={isFocus}
        text={useBlocks('stats.usersdoingthis')}
      />

      <Stat
        data={props.timeToImplement}
        icon={IconTimer}
        isFocus={isFocus}
        overwriteData={time}
        text={useBlocks('stats.timetoimplement')}
      />

      <Stat
        data={props.carbonSaved}
        icon={IconKg}
        isFocus={isFocus}
        text={useBlocks('stats.carbonsaved')}
      />
    </div>
  )
}

export default ActionStats
