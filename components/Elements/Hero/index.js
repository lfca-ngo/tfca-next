import { Button, Typography } from 'antd'
import { motion } from 'framer-motion'
import React from 'react'

import useIsClient from '../../../hooks/useIsClient'
import { useBlocks } from '../../../hooks/useTranslation'
import { textReveal } from '../../../utils/animations'
import { Text } from '../../../utils/Text'

export const Hero = (props) => {
  const { isMobile } = useIsClient()

  return (
    <motion.div className="content" style={props.dynamicStyles.opacity}>
      <Typography.Title className="text-appear-wrapper">
        <motion.span animate="visible" initial="hidden" variants={textReveal}>
          {props.textBlocks.title}
        </motion.span>
      </Typography.Title>
      <p className="text-appear-wrapper">
        <motion.span animate="visible" initial="hidden" variants={textReveal}>
          <Text
            block={useBlocks('header.body')}
            vars={{ emoji: isMobile ? ` 👇` : ` 👉` }}
          />
        </motion.span>
      </p>

      <motion.div
        animate="visible"
        className="start-btn"
        initial="hidden"
        variants={textReveal}
      >
        <Button
          block
          className="ant-btn-xl"
          onClick={props.onClick}
          size="large"
          type="primary"
        >
          {`Los geht's`}
        </Button>
      </motion.div>
    </motion.div>
  )
}
