require('./styles.less')

import { CaretDownOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import { useContentBlocks, useCustomization } from '../../../hooks'
import { textBlockToString } from '../../../utils'
import { ChallengeStatus } from '../ChallengeStatus'
import { FloatingWrapper } from '../FloatingWrapper'

export const Hero = ({ onClick, openGraphInfo }) => {
  const { query } = useRouter()
  const { team } = query
  const teamCapitalized = team?.charAt(0).toUpperCase() + team?.slice(1)

  const customization = useCustomization()

  const defaultBlock = useContentBlocks('header.title')
  const customBlock = useContentBlocks('header.title.custom')
  const recipientsFallback = textBlockToString(
    useContentBlocks('header.title.recipients.fallback')
  )
  const pageSubtitle = useContentBlocks('header.body')

  return (
    <div className="hero">
      <div className="container-max">
        <div className="content">
          <div className="bg-wrapper plant">
            <Image
              layout="fill"
              objectFit="contain"
              objectPosition={'center'}
              src={`/images/plant.svg`}
            />
          </div>
          <div className="bg-wrapper mouth">
            <Image
              layout="fill"
              objectFit="contain"
              objectPosition={'center'}
              src={`/images/mouth.svg`}
            />
          </div>

          <h1 data-testid="hero-title">
            {team ? (
              <>
                Take action with <strong>{teamCapitalized}</strong>{' '}
              </>
            ) : customization?.invitedUserName ? (
              textBlockToString(
                customBlock,
                {
                  name: customization.invitedUserName || recipientsFallback,
                },
                {},
                true
              )
            ) : (
              textBlockToString(defaultBlock, {}, true)
            )}
          </h1>
          <p>
            {team
              ? 'Your team is participating in the TFCA Teams Challenge. Collect points by completing actions and inviting friends!'
              : textBlockToString(pageSubtitle)}
          </p>

          <div className="start-btn">
            <Button
              className="ant-btn-xl with-arrow"
              data-testid="hero-take-action-btn"
              onClick={onClick}
              size="large"
              type="primary"
            >
              {textBlockToString(useContentBlocks('header.button.primary'))}
            </Button>
          </div>

          <div className="scroll-continue">
            <Button icon={<CaretDownOutlined />} shape="circle" />
          </div>
        </div>
        {/* Challenge status (floating) */}
        <FloatingWrapper>
          <ChallengeStatus
            className={'hidden md-max'}
            openGraphInfo={openGraphInfo}
          />
        </FloatingWrapper>
      </div>
    </div>
  )
}
