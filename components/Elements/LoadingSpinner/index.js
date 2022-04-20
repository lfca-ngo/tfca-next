require('./styles.less')

import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'
import classNames from 'classnames'
import { motion } from 'framer-motion'
import React from 'react'

const DEFAULT_COLOR = '#fff'

const COLOR_MAP = {
  'color-1': {
    from: DEFAULT_COLOR,
    to: '#00e0ad',
  },
  'color-2': {
    from: DEFAULT_COLOR,
    to: '#b148ad',
  },
  'color-3': {
    from: DEFAULT_COLOR,
    to: '#375ba7',
  },
  'color-4': {
    from: DEFAULT_COLOR,
    to: '#ff9d59',
  },
  pink: {
    from: '#622860',
    to: '#d82086',
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
    strokeWidth: 1.5,
  },
})

const BullhornSpinner = ({ color }) => {
  const transition = { duration: 2, ease: 'easeInOut', yoyo: Infinity }
  const pathVariants = variants(color)

  return (
    <svg height="80" viewBox="0 0 44 40" width="88">
      <title>bullhorn</title>
      <motion.path
        animate="animate"
        d="M19.752,25.256a19.575,19.575,0,0,1,3.957.795C28.234,27.579,34.957,34.115,39,37.733V24.262a1.013,1.013,0,0,1,.829-.981,4,4,0,0,0,0-7.828A1.013,1.013,0,0,1,39,14.472V1C34.957,4.618,28.234,11.154,23.709,12.692a30.088,30.088,0,0,1-5.911.975H4a3,3,0,0,0-3,3v5.4a3,3,0,0,0,3,3H8.583L12.532,39h6.583l-3.95-13.933V18"
        fill="none"
        initial="initial"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transition={transition}
        variants={pathVariants}
      />
    </svg>
  )
}

const LeafSpinner = ({ color }) => {
  const transition = { duration: 2, ease: 'easeInOut', yoyo: Infinity }
  const pathVariants = variants(color)

  return (
    <svg height="88" viewBox="0 0 43.06 44" width="86">
      <title>leaf</title>
      <motion.path
        animate="animate"
        d="M1,42.881c5.429.576,11.369-.938,14.11-4.593,2.513,2.208,14.322,5.388,22.665-4.715,5.583-6.763,4.872-18.128,2.572-23.888C38.127,3.636,35.115,1.072,34.854,1a20.465,20.465,0,0,1-3.893,8.942c-3.588,4.724-9.29,6.98-12.707,9.453-6.465,4.677-6.889,8.658-5.022,14.689,7.05-.513,11.562-3.14,16.37-7.271a18.909,18.909,0,0,0,5.582-9.428"
        fill="none"
        fillRule="evenodd"
        initial="initial"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transition={transition}
        variants={pathVariants}
      />
    </svg>
  )
}

const LayerSpinner = ({ color }) => {
  const transition = { duration: 2, ease: 'easeInOut', yoyo: Infinity }
  const pathVariants = variants(color)

  return (
    <svg height="72" viewBox="0 0 44 36" width="88">
      <title>layers</title>
      <motion.polyline
        animate="animate"
        fill="none"
        initial="initial"
        points="38.021 23.008 43 25 21 35 1 27 10.362 22.745 21 27 43 17 33.638 13.255 21 19 1 11 23 1 43 9 38.396 11.093"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transition={transition}
        variants={pathVariants}
      />
    </svg>
  )
}

const CheckmarkSpinner = ({ color }) => {
  const transition = { duration: 2, ease: 'easeInOut', yoyo: Infinity }
  const pathVariants = variants(color)

  return (
    <svg height="88" viewBox="0 0 44 44" width="88">
      <title>checkmark</title>
      <motion.path
        animate="animate"
        d="M41.852,15.133a21.023,21.023,0,1,1-4.6-7.574,3.019,3.019,0,0,1,.111,4.045L21.612,29.917a1.5,1.5,0,0,1-2.142.136l-9.052-8.164"
        fill="none"
        initial="initial"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transition={transition}
        variants={pathVariants}
      />
    </svg>
  )
}

const EnergySpinner = ({ color }) => {
  const transition = { duration: 2, ease: 'easeInOut', yoyo: Infinity }
  const pathVariants = variants(color)

  return (
    <svg height="86" viewBox="0 0 25.75 43.847" width="50">
      <title>bolt</title>
      <motion.polyline
        animate="animate"
        fill="none"
        initial="initial"
        points="18.5 1 8 1 1 23.34 11.5 23.34 5.5 42.847 24.75 14.628 14.25 14.628 16.678 6.842"
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        transition={transition}
        variants={pathVariants}
      />
    </svg>
  )
}

const IconSelector = ({ color, type }) => {
  switch (type) {
    case 'politics':
      return <BullhornSpinner color={color} />
    case 'energy':
      return <EnergySpinner color={color} />
    case 'check':
      return <CheckmarkSpinner color={color} />
    case 'home':
      return <LayerSpinner color={color} />
    case 'leaf':
      return <LeafSpinner color={color} />
    default:
      return <LoadingOutlined />
  }
}

export const spinnerProps = ({ color, spinning = true, type }) => ({
  indicator: <IconSelector color={color} type={type} />,
  spinning: spinning,
  wrapperClassName: 'loading-wrapper',
})

export const LoadingSpinner = ({
  additionalSpinnerProps = {},
  className,
  label,
  title,
}) => {
  return (
    <div className={classNames('loading-wrapper', 'centered', className)}>
      <Spin {...spinnerProps(additionalSpinnerProps)} />
      {title && <h4 className="title">{title}</h4>}
      {label && <p className="label">{label}</p>}
    </div>
  )
}

export const HomeLoader = () => {
  return (
    <div>
      <LoadingSpinner
        additionalSpinnerProps={{ color: 'color-3', type: 'leaf' }}
        className="home-loader"
        label={
          'Did you know that the last decade was the hottest in 125,000 years?'
        }
        title="...loading"
      />
    </div>
  )
}
