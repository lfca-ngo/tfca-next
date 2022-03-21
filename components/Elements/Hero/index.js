require('./styles.less')

import { Button, Typography } from 'antd'
import React from 'react'

import { useApp, useContentBlocks, useIsMobile } from '../../../hooks'
import { text } from '../../../utils/Text'

export const Hero = ({ onClick }) => {
  const isMobile = useIsMobile()
  const { customization } = useApp()
  const customHeaderText = (
    <span>
      Hi <span className="text-accent">David</span>, ready to act?
    </span>
  ) // useContentBlocks('header.title.custom')
  const headerText = (
    <span>
      The time to act is <span className="text-accent">now</span>
    </span>
  ) //useContentBlocks('header.title')

  const header = customization
    ? customHeaderText // text(customHeaderText, { name: customization.to })
    : headerText // text(headerText)

  return (
    <div className="hero content main-container">
      <Typography.Title>
        <span>{header}</span>
      </Typography.Title>
      <p>
        <span>
          {text(useContentBlocks('header.body'), {
            emoji: isMobile ? ` 👇` : ` 👉`,
          })}
        </span>
      </p>

      <div className="start-btn">
        <Button
          className="ant-btn-xl"
          onClick={onClick}
          size="large"
          type="primary"
        >
          {text(useContentBlocks('header.button.primary'))}
        </Button>
      </div>
    </div>
  )
}
