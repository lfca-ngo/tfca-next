require('./styles.less')

import { Popover } from 'antd'
import React, { useEffect, useState } from 'react'

import { useUser } from '../../hooks'
import { useUserScore } from '../../services/internal/userscore'

const formatSeconds = (duration) => {
  // Hours, minutes and seconds
  const hrs = ~~(duration / 3600)
  const mins = ~~((duration % 3600) / 60)
  const secs = ~~duration % 60

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let ret = ''

  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '')
  }

  ret += '' + mins + ':' + (secs < 10 ? '0' : '')
  ret += '' + secs
  return ret
}

export const TimeCounter = () => {
  const [seconds, setSeconds] = useState(0)
  const { userId } = useUser()

  // do not actively fetch here, just check in local cache
  const { data } = useUserScore(userId, {
    enabled: false,
  })
  const hasTakenActions = !!data?.user?.completedActions

  useEffect(() => {
    setTimeout(() => setSeconds(seconds + 1), 1000)
  }, [seconds])

  return (
    <Popover
      content={
        hasTakenActions
          ? 'Awesome! You have already taken action 👏'
          : 'The time you’ve spent on this site without taking action 😁'
      }
      overlayClassName="popover-sm"
    >
      <div className="time-counter">
        <span className="time">{formatSeconds(seconds)}</span>
      </div>
    </Popover>
  )
}
