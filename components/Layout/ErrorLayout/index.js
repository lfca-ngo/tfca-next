require('./styles.less')

import { Button } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { useContentBlocks } from '../../../hooks'
import { textBlockToString } from '../../../utils'
import { Text } from '../../Elements'
import { SuperText } from '../../Elements'
import ErrorImage from './error.png'

const ErrorTemplate = ({ data }) => {
  return (
    <div className="error-template">
      <div className="container">
        <div className="content">
          <SuperText text={data.superText} />
          <h1>{data.title}</h1>
          {data.body}
          <Button className="ant-btn-xl" size="large" type="primary">
            <Link href="/">{data.button}</Link>
          </Button>
        </div>
        <div className="img-wrapper">
          <Image layout="fill" objectFit="contain" src={ErrorImage} />
        </div>
      </div>
    </div>
  )
}

// pages with custom sections like about campaign etc.
export const ErrorLayout = ({ errorCode = 500 }) => {
  const ERROR_MAP = {
    404: {
      body: <Text block={useContentBlocks('page.error.404.body')} />,
      button: textBlockToString(useContentBlocks('page.error.404.button')),
      superText: textBlockToString(
        useContentBlocks('page.error.404.supertext')
      ),
      title: textBlockToString(useContentBlocks('page.error.404.title')),
    },
    500: {
      body: <Text block={useContentBlocks('page.error.500.body')} />,
      button: textBlockToString(useContentBlocks('page.error.500.button')),
      superText: textBlockToString(
        useContentBlocks('page.error.500.supertext')
      ),
      title: textBlockToString(useContentBlocks('page.error.500.title')),
    },
  }

  return <ErrorTemplate data={ERROR_MAP[errorCode]} />
}
