require('./styles.less')

import { Button, Typography } from 'antd'
import Image from 'next/image'
import React from 'react'

import { useContentBlocks, useCustomization, useIsMobile } from '../../../hooks'
import { namesArrayToString } from '../../../utils'
import { text } from '../../../utils/Text'
import World from './world.png'

export const Hero = ({ onClick }) => {
  const isMobile = useIsMobile()
  const customization = useCustomization()
  const customHeaderText = (
    <span>
      Hi{' '}
      <span className="text-accent">
        {namesArrayToString(customization?.names)}
      </span>
      , ready to act?
    </span>
  ) // useContentBlocks('header.title.custom')
  const headerText = (
    <span>
      The time to act is <span className="text-accent">now</span>
    </span>
  ) //useContentBlocks('header.title')

  // TODO: Get texts from contentful
  const header = customization?.names
    ? customHeaderText // text(customHeaderText, { name: customization.to })
    : headerText // text(headerText)

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
