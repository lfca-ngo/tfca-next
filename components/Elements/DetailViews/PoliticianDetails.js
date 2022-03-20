require('./politicianDetails.less')

import { CopyOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Input, message, Select } from 'antd'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { ScrollableFilters } from '../ScrollableFilters'

const TextArea = Input.TextArea

export const PoliticianDetails = ({ item, onFinish, setStore, store }) => {
  const [text, setText] = React.useState('')

  const messagesValueKey = store[store.messagesFilterKey]
  const messages =
    store.messagesByFilterValue[
      Array.isArray(messagesValueKey) ? messagesValueKey[0] : messagesValueKey
    ]

  const handleSend = () => {
    onFinish()
    const mailToLink = `mailto:${
      item.email
    }?subject=${messageSubject}&cc=politics@lfca.earth&body=${encodeURIComponent(
      text
    )}`
    window.location.href = mailToLink
  }

  const messagesSelect = {
    fieldName: 'messagesFilterKey',
    filterMode: 'select-single',
    label: 'Message',
    options: messages.map((m, i) => ({ label: `Message ${i}`, value: i })),
    placeholder: 'Please select',
  }

  return (
    <div className="politician-detail-view">
      <ScrollableFilters
        availableFilters={[...store?.availableFilters, messagesSelect]}
        setStore={setStore}
        store={store}
      />

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
