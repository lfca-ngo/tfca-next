require('./styles.less')

import { CopyOutlined } from '@ant-design/icons'
import { Button, Input, message } from 'antd'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const { TextArea } = Input

export const CopyTextArea = ({ setText, text }) => {
  return (
    <div className="copy-text-area">
      <TextArea
        onChange={(e) => setText(e.target.value)}
        rows={10}
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
