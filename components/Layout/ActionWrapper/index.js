require('./styles.less')

import { motion } from 'framer-motion'
import React, { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

import { useActiveAction } from '../../../hooks'
import { appear } from '../../../utils/animations'
import { ActionStats } from '../../Elements'

export const ActionWrapper = (props) => {
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
        <div className="action-body">{props.children}</div>
        <div className="footer">
          <ActionStats
            effort={props.effort}
            impact={props.impact}
            impactDisclaimer={props.impactDisclaimer}
            name={props.name}
            otherUsers={props.otherUsers}
            timeLeft={null}
          />
        </div>
      </motion.div>
    </div>
  )
}
