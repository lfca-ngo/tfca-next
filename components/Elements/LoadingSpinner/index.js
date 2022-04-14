require('./styles.less')

import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import React from 'react'

const DEFAULT_COLOR = '#fff'

const COLOR_MAP = {
  'color-1': {
    from: '#009976',
    to: '#00e0ad',
  },
}

const variants = (color) => ({
  animate: {
    pathLength: 0,
    stroke: COLOR_MAP[color]?.to || DEFAULT_COLOR,
    strokeWidth: 1,
  },
  initial: {
    pathLength: 1,
    stroke: COLOR_MAP[color]?.from || DEFAULT_COLOR,
    strokeWidth: 2,
  },
})

const EnergySpinner = ({ color }) => {
  const transition = { duration: 2, ease: 'easeInOut', yoyo: Infinity }
  const pathVariants = variants(color)
  console.log(pathVariants)
  return (
    <svg height="86" viewBox="0 0 25.75 43.847" width="50">
      <title>bolt</title>
      <motion.polyline
        animate="animate"
        fill="none"
        initial="initial"
        points="18.5 1 8 1 1 23.34 11.5 23.34 5.5 42.847 24.75 14.628 14.25 14.628 16.678 6.842"
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        transition={transition}
        variants={pathVariants}
      />
    </svg>
  )
}

const IconSelector = ({ color, type }) => {
  switch (type) {
    case 'energy':
      return <EnergySpinner color={color} />
    default:
      return <LoadingOutlined />
  }
}

export const spinnerProps = (spinning = true, type, color) => ({
  indicator: <IconSelector color={color} type={type} />,
  spinning: spinning,
  wrapperClassName: 'loading-wrapper',
})

export const LoadingSpinner = ({ className, label }) => {
  return (
    <div className={classNames('loading-wrapper', 'centered', className)}>
      <Spin {...spinnerProps()} />
      {label && <p className="label">{label}</p>}
    </div>
  )
}
