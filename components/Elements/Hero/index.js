require('./styles.less')

import { Button, Typography } from 'antd'
import React from 'react'

import { useChallenge } from '../../../hooks/useChallenge'
import { useIsMobile } from '../../../hooks/useIsClient'
import { useBlocks } from '../../../hooks/useTranslation'
import { Text, text } from '../../../utils/Text'

export const Hero = (props) => {
  const isMobile = useIsMobile()
  const { customization } = useChallenge()
  const customHeaderText = useBlocks('header.title.custom')
  const headerText = useBlocks('header.title')

  const header = customization
    ? text(customHeaderText, { name: customization.to })
    : text(headerText)

  return (
    <div className="hero content main-container">
      <Typography.Title>
        <span>{header}</span>
      </Typography.Title>
      <p>
        <span>
          {text(useBlocks('header.body'), { emoji: isMobile ? ` 👇` : ` 👉` })}
        </span>
      </p>

      <div className="start-btn">
        <Button
          className="ant-btn-xl"
          onClick={props.onClick}
          size="large"
          type="primary"
        >
          {text(useBlocks('header.button.primary'))}
        </Button>
      </div>
    </div>
  )
}
