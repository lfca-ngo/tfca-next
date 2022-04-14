require('./styles.less')

import { Button } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { useContentBlocks } from '../../../hooks'
import { textBlockToString } from '../../../utils'
import { SuperText } from '../../Elements'
import ErrorImage from './error.png'

const ErrorTemplate = ({ data }) => {
  return (
    <div className="error-template">
      <div className="container">
        <div className="content">
          <SuperText text={data.superText} />
          <h1>{data.title}</h1>
          <p>{data.body}</p>
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
export const ErrorLayout = ({ errorCode }) => {
  const ERROR_MAP = {
    404: {
      body: textBlockToString(useContentBlocks('page.error.404.body')),
      button: textBlockToString(useContentBlocks('page.error.404.button')),
      superText: textBlockToString(
        useContentBlocks('page.error.404.supertext')
      ),
      title: textBlockToString(useContentBlocks('page.error.404.title')),
    },
  }

  switch (errorCode) {
    case 404:
      return <ErrorTemplate data={ERROR_MAP[404]} />
    default:
      return null
  }
}
