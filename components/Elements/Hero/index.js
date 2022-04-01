require('./styles.less')

import { Button, Typography } from 'antd'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'

import { useContentBlocks, useCustomization } from '../../../hooks'
import { text } from '../../../utils/Text'
import World from './world.png'

export const Hero = ({ onClick }) => {
  const customization = useCustomization()

  const defaultBlock = useContentBlocks('header.title')
  const customBlock = useContentBlocks('header.title.custom')
  const recipientsFallback = text(
    useContentBlocks('header.title.recipients.fallback')
  )

  const bodyText = text(useContentBlocks('header.body'))

  return (
    <div className="hero content">
      <Head>
        <meta
          content={(customization?.names?.length
            ? text(customBlock, {
                name:
                  customization.names.length === 1
                    ? customization.names[0]
                    : recipientsFallback,
              })
            : text(defaultBlock)
          ).replace(/\*/g, '')}
          property="og:title"
        />
        <meta content={bodyText} property="og:description" />
        <meta
          content={`${process.env.NEXT_PUBLIC_VERCEL_URL}${
            customization?.token
              ? `/api/images/${customization.token}`
              : '/images/og_default.png'
          }`}
          property="og:image"
        />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="@Leaders4CA" name="twitter:site" />
        <meta content="@Leaders4CA" name="twitter:creator" />
      </Head>

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
      <p>{bodyText}</p>

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
