require('./politicianDetails.less')

import { CopyOutlined, MailOutlined } from '@ant-design/icons'
import { Button, Form, Input, message, Select } from 'antd'
import React, { useEffect } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { ScrollableFilters } from '../ScrollableFilters'

const TextArea = Input.TextArea

export const PoliticianDetails = ({ item, onFinish, setStore, store }) => {
  const {
    activeMessageIndex,
    availableFilters,
    badges,
    messagesByFilterValue,
  } = store
  const messages = messagesByFilterValue[badges]
  const activeMessage = messages[activeMessageIndex]
  const [text, setText] = React.useState('')

  useEffect(() => {
    setText(activeMessage?.text)
  }, [activeMessageIndex, badges, activeMessage])

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
    fieldName: 'activeMessageIndex',
    filterMode: 'select-single',
    label: 'Message',
    options: messages.map((m, i) => ({ label: `Message ${i + 1}`, value: i })),
    placeholder: 'Please select',
  }

  return (
    <div className="politician-detail-view">
      <ScrollableFilters
        additionalItems={[
          <Form.Item
            key={messagesSelect.fieldName}
            label={messagesSelect.label}
          >
            <Select
              onChange={(val) =>
                setStore({ ...store, activeMessageIndex: val })
              }
              placeholder={messagesSelect.placeholder}
              size="small"
              value={store?.activeMessageIndex}
            >
              {messagesSelect?.options.map((item) => (
                <Select.Option key={item.value} value={item.value}>
                  {item.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>,
        ]}
        availableFilters={availableFilters.filter(
          (f) => f.fieldName === 'badges'
        )}
        setStore={(store) => {
          // reset the active message when changing the filter
          setStore({ ...store, activeMessageIndex: 0 })
        }}
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
