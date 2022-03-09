require('./politicianDetails.less')

import { CopyOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Input, message } from 'antd'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { PoliticianCard } from '../Cards'

const TextArea = Input.TextArea

export const PoliticianDetails = ({
  initialMessage,
  item,
  messageSubject,
  onFinish,
}) => {
  const [text, setText] = React.useState(initialMessage)

  const handleSend = () => {
    onFinish()
    const mailToLink = `mailto:${
      item.email
    }?subject=${messageSubject}&cc=politics@lfca.earth&body=${encodeURIComponent(
      text
    )}`
    window.location.href = mailToLink
  }

  return (
    <div className="politician-detail-view">
      <PoliticianCard item={item} />

      <TextArea
        onChange={(e) => setText(e.target.value)}
        rows={10}
        style={{ margin: '20px 0 10px' }}
        value={text}
      />

      <CopyToClipboard
        onCopy={() => {
          message.success('Copied value')
        }}
        text={text}
      >
        <Button
          block
          className="mt-30"
          icon={<CopyOutlined />}
          size="large"
          type="default"
        >
          Copy
        </Button>
      </CopyToClipboard>

      <Button
        block
        className="mt-30"
        icon={<MailOutlined />}
        onClick={handleSend}
        size="large"
        type="default"
      >
        E-Mail
      </Button>
    </div>
  )
}
