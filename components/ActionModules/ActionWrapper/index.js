require('./styles.less')

import { motion } from 'framer-motion'
import React, { useState } from 'react'
import Confetti from 'react-confetti'
import { Element, Link, scroller } from 'react-scroll'

import { appear } from '../../../utils/animations'
import ActionStats from './ActionStats'

const ActionWrapper = (props) => {
  const [showConfetti, setShowConfetti] = useState(false)
  const [isExpanded, expand] = useState(false)
  const [isBarHidden, hideBar] = useState(false)
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
      {showConfetti && <Confetti />}

      <motion.div
        className="action-container"
        initial={'hidden'}
        variants={appear}
        whileInView={'visible'}
      >
        <div className="action-body">
          {React.cloneElement(props.children, {
            expand: expand,
            isExpanded: isExpanded,
            hideBar: hideBar,
            isBarHidden: isBarHidden,
            startCounter: startCounter,
            name: props.name,
            color: props.color,
            setShowConfetti: setShowConfetti,
          })}
        </div>
        <div className="footer">
          {!isBarHidden && (
            <ActionStats
              carbonSaved={props.carbonSaved}
              labels={props.labels}
              name={props.name}
              otherUsers={props.otherUsers}
              timeLeft={counterActive ? timeLeft / 1000 : null}
              timeToImplement={props.timeToImplement}
            />
          )}
        </div>
      </motion.div>
    </Element>
  )
}

export default ActionWrapper
