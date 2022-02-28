require('./styles.less')

import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { useActiveAction } from '../../../hooks/useIsClient'
import { appear } from '../../../utils/animations'
import ActionStats from './ActionStats'

const ActionWrapper = (props) => {
  const [counterActive, setCounterActive] = useState(false)
  const initialTime = 60 * 1000 * props.timeToImplement
  // const [timeLeft, { start }] = useCountDown(initialTime, 1000)

  const startCounter = () => {
    // setCounterActive(true);
    // start();
  }

  const { inView, ref } = useInView({ threshold: 0.5 })
  const { setActiveAction } = useActiveAction()

  useEffect(() => {
    if (inView) setActiveAction(props.id)
  }, [inView, props.id])

  return (
    <div
      className={`action-wrapper ${props.color || ''}`}
      id={props.id}
      ref={ref}
    >
      <motion.div
        className="action-container main-container"
        initial={'hidden'}
        variants={appear}
        whileInView={'visible'}
      >
        <div className="action-body">
          {React.cloneElement(props.children, {
            color: props.color,
            name: props.name,
          })}
        </div>
        <div className="footer">
          <ActionStats
            carbonSaved={props.carbonSaved}
            name={props.name}
            otherUsers={props.otherUsers}
            timeLeft={counterActive ? timeLeft / 1000 : null}
            timeToImplement={props.timeToImplement}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default ActionWrapper
