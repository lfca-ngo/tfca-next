require('./styles.less')

import { Button, Typography } from 'antd'
import Image from 'next/image'
import React from 'react'

import { useContentBlocks, useCustomization } from '../../../hooks'
import { Text, text } from '../../../utils/Text'
import World from './world.png'

export const Hero = ({ onClick }) => {
  const customization = useCustomization()

  const defaultBlock = useContentBlocks('header.title')
  const customBlock = useContentBlocks('header.title.custom')
  const recipientsFallback = text(
    useContentBlocks('header.title.recipients.fallback')
  )

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

      {customization?.names?.length ? (
        <Text
          block={customBlock}
          vars={{
            name:
              customization.names.length === 1
                ? customization.names[0]
                : recipientsFallback,
          }}
        />
      ) : (
        <Text block={defaultBlock} />
      )}
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
