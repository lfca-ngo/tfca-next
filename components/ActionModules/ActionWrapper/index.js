require('./styles.less')

import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Element, Link, scroller } from 'react-scroll'

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

  return (
    <Element
      className={`action-wrapper ${props.color || ''}`}
      name={props.name}
    >
      <motion.div
        className="action-container"
        initial={'hidden'}
        variants={appear}
        whileInView={'visible'}
      >
        <div className="action-body">
          {React.cloneElement(props.children, {
            color: props.color,
            name: props.name,
            startCounter: startCounter,
          })}
        </div>
        <div className="footer">
          <ActionStats
            carbonSaved={props.carbonSaved}
            labels={props.labels}
            name={props.name}
            otherUsers={props.otherUsers}
            timeLeft={counterActive ? timeLeft / 1000 : null}
            timeToImplement={props.timeToImplement}
          />
        </div>
      </motion.div>
    </Element>
  )
}

export default ActionWrapper
