require('./styles.less')

import { Button, Typography } from 'antd'
import Image from 'next/image'
import React from 'react'

import { useContentBlocks, useCustomization } from '../../../hooks'
import { namesArrayToString } from '../../../utils'
import { text } from '../../../utils/Text'
import World from './world.png'

export const Hero = ({ onClick }) => {
  const customization = useCustomization()

  const recipientsFallback = text(
    useContentBlocks('header.title.recipients.fallback')
  )
  const defaultBlock = useContentBlocks('header.title')
  const customBlock = useContentBlocks('header.title.custom')
  const customWithVars = text(customBlock, {
    name: namesArrayToString(customization?.names, recipientsFallback),
  })

  const customHeaderText = (
    <span dangerouslySetInnerHTML={{ __html: customWithVars }} />
  )
  const headerText = (
    <span dangerouslySetInnerHTML={{ __html: text(defaultBlock) }} />
  )
  const header = customization?.names ? customHeaderText : headerText

  return (
    <div className="hero content">
      <div className="bg-wrapper">
        <Image
          layout="fill"
          objectFit="contain"
          objectPosition={'center'}
          src={World}
        />
      </div>

      <Typography.Title>
        <span>{header}</span>
      </Typography.Title>
      <p>
        <span>{text(useContentBlocks('header.body'))}</span>
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
