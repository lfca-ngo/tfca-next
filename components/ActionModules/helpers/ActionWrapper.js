require('./styles.less')

import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useActiveAction } from '../../../hooks/useIsClient'
import { appear } from '../../../utils/animations'
import ActionStats from './ActionStats'

const ActionWrapper = (props) => {
  const { inView, ref } = useInView({ threshold: 0.5 })
  const { setActiveAction } = useActiveAction()

  useEffect(() => {
    if (inView) setActiveAction(props.id)
  }, [inView, props.id, setActiveAction])

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
            id: props.id,
            name: props.name,
          })}
        </div>
        <div className="footer">
          <ActionStats
            effort={props.effort}
            impact={props.impact}
            name={props.name}
            otherUsers={props.otherUsers}
            timeLeft={null}
          />
        </div>
      </motion.div>
    </div>
  )
}

export default ActionWrapper
