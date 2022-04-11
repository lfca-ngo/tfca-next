require('./styles.less')

import { Button, Typography } from 'antd'
import Image from 'next/image'
import React from 'react'

import { useContentBlocks, useCustomization } from '../../../hooks'
import { text } from '../../../utils/text'
import { ChallengeStatus } from '../ChallengeStatus'
import World from './world.png'

export const Hero = ({ onClick, openGraphInfo }) => {
  const customization = useCustomization()

  const defaultBlock = useContentBlocks('header.title')
  const customBlock = useContentBlocks('header.title.custom')
  const recipientsFallback = text(
    useContentBlocks('header.title.recipients.fallback')
  )

  return (
    <div className="hero">
      <div className="container-max">
        <div className="content">
          <div className="bg-wrapper">
            <Image
              layout="fill"
              objectFit="contain"
              objectPosition={'center'}
              src={World}
            />
          </div>

          <Typography.Title>
            {customization?.names?.length
              ? text(
                  customBlock,
                  {
                    name:
                      customization.names.length === 1
                        ? customization.names[0]
                        : recipientsFallback,
                  },
                  {},
                  true
                )
              : text(defaultBlock, {}, true)}
          </Typography.Title>
          <p>{text(useContentBlocks('header.body'))}</p>

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
        {/* Challenge status (floating) */}
        <ChallengeStatus
          className={'hidden md-max floating'}
          openGraphInfo={openGraphInfo}
        />
      </div>
    </div>
  )
}
