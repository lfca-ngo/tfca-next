require('./styles.less')

import { CopyOutlined } from '@ant-design/icons'
import { Button, Input, message } from 'antd'
import classNames from 'classnames'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const { TextArea } = Input

export const CopyTextArea = ({ rows = 10, setText, text, textSize }) => {
  return (
    <div className={classNames('copy-text-area', textSize)}>
      <TextArea
        onChange={(e) => setText(e.target.value)}
        rows={rows}
        value={text}
      />
      <CopyToClipboard
        onCopy={() => {
          message.success('Copied value')
        }}
        text={text}
      >
        <Button icon={<CopyOutlined />} size="large" type="primary" />
      </CopyToClipboard>
    </div>
  )
}
