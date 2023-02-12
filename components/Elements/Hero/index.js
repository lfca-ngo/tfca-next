require('./styles.less')

import { CaretDownOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

import { useContentBlocks, useCustomization } from '../../../hooks'
import useFitText from '../../../hooks/useTextfit'
import { textBlockToString } from '../../../utils'
import { ChallengeStatus } from '../ChallengeStatus'
import { FloatingWrapper } from '../FloatingWrapper'

export const Hero = ({ onClick, openGraphInfo, team }) => {
  const [finalContainerHeight, setFinalContainerHeight] = useState()
  const textRef = useRef(null)
  const teamId = team && team.teamId
  const teamCapitalized = teamId?.charAt(0).toUpperCase() + teamId?.slice(1)

  const customization = useCustomization()

  const defaultBlock = useContentBlocks('header.title')
  const customBlock = useContentBlocks('header.title.custom')
  const recipientsFallback = textBlockToString(
    useContentBlocks('header.title.recipients.fallback')
  )
  const pageSubtitle = useContentBlocks('header.body')

  const onResizeFinish = () => {
    setFinalContainerHeight(textRef?.current?.scrollHeight)
  }

  const { fontSize, ref } = useFitText({
    minFontSize: 65,
    onFinish: onResizeFinish,
    resolution: 2,
  })

  const innerTextHeight = textRef?.current?.scrollHeight
  const containerHeight = ref?.current?.scrollHeight
  const offsetHeight = containerHeight - innerTextHeight

  return (
    <div className="hero">
      <div className="container-max">
        <div className="content">
          <div className="bg-wrapper graphic-left">
            <Image
              layout="fill"
              objectFit="contain"
              objectPosition={'center'}
              src={`/images/earth-yellow.png`}
            />
          </div>
          <div className="bg-wrapper graphic-right">
            <div className="bg-image">
              <Image
                layout="fill"
                objectFit="contain"
                objectPosition={'center'}
                src={`/images/speaker-simple.png`}
              />
            </div>
            <div className="bg-wall" />
          </div>

          <h1
            style={{
              height: finalContainerHeight,
              marginBottom: `${offsetHeight + 15}px`,
            }}
          >
            <div
              className="hero-title"
              data-testid="hero-title"
              ref={ref}
              style={{ fontSize }}
            >
              <span ref={textRef}>
                {teamId ? (
                  <>
                    Take action with{' '}
                    <span className="highlight">{teamCapitalized}</span>{' '}
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
              </span>
            </div>
          </h1>
          <p>
            {teamId
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
