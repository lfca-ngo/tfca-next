require('./styles.less')

import { Button } from 'antd'
import Image from 'next/image'
import React from 'react'

import { useContentBlocks, useCustomization } from '../../../hooks'
import { textBlockToString } from '../../../utils'
import { ChallengeStatus } from '../ChallengeStatus'
import World from './world.png'

export const Hero = ({ onClick, openGraphInfo }) => {
  const customization = useCustomization()

  const defaultBlock = useContentBlocks('header.title')
  const customBlock = useContentBlocks('header.title.custom')
  const recipientsFallback = textBlockToString(
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

          <h1 data-testid="hero-title">
            {customization?.names?.length
              ? textBlockToString(
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
              : textBlockToString(defaultBlock, {}, true)}
          </h1>
          <p>{textBlockToString(useContentBlocks('header.body'))}</p>

          <div className="start-btn">
            <Button
              className="ant-btn-xl"
              data-testid="hero-take-action-btn"
              onClick={onClick}
              size="large"
              type="primary"
            >
              {textBlockToString(useContentBlocks('header.button.primary'))}
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
