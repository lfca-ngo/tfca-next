require('./styles.less')

import { CaretDownOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useRef, useState } from 'react'

import { useContentBlocks, useCustomization } from '../../../hooks'
import useFitText from '../../../hooks/useTextfit'
import { textBlockToString } from '../../../utils'
import { ChallengeStatus } from '../ChallengeStatus'
import { FloatingWrapper } from '../FloatingWrapper'

export const Hero = ({ onClick, openGraphInfo }) => {
  const [finalContainerHeight, setFinalContainerHeight] = useState()
  const textRef = useRef(null)
  const { isReady, query } = useRouter()
  const { team } = query
  const teamCapitalized = team?.charAt(0).toUpperCase() + team?.slice(1)

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
    minFontSize: 70,
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

          <h1
            style={{
              height: finalContainerHeight,
              marginBottom: offsetHeight || 0,
            }}
          >
            <div
              className="hero-title"
              data-testid="hero-title"
              key={isReady ? 'ready' : ''}
              ref={ref}
              style={{ fontSize }}
            >
              <span ref={textRef}>
                {team ? (
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
