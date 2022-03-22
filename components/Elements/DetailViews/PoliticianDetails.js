require('./politicianDetails.less')

import { MailOutlined } from '@ant-design/icons'
import { Button, Form, Select, Space } from 'antd'
import React, { useEffect } from 'react'

import { text as replaceVars } from '../../../utils/Text'
import { CopyTextArea } from '../CopyTextArea'
import { ScrollableFilters } from '../ScrollableFilters'

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
    const withVars = replaceVars(activeMessage.text, { name: item.name })
    setText(withVars)
  }, [activeMessageIndex, badges, activeMessage, item])

  const handleSend = () => {
    const mailToLink = `mailto:${item.email}?subject=${replaceVars(
      activeMessage.subject,
      { name: item.name }
    )}&cc=politics@lfca.earth&body=${encodeURIComponent(text)}`
    window.location.href = mailToLink
    // remove selectedItem aka politician
    // from store and add to sentItems
    const { selectedItems, sentItems } = store
    const newSentItems = [...sentItems, item]
    selectedItems.splice(store?.slideIndex, 1)
    setStore({
      ...store,
      selectedItems,
      sentItems: newSentItems,
    })
    // once all politicians are sent, go to next step
    if (selectedItems.length === 0) onFinish()
  }

  const messagesOptions = messages.map((m, i) => ({
    label: `Message ${i + 1}`,
    value: i,
  }))

  return (
    <div className="detail-view politician">
      <ScrollableFilters
        additionalItems={[
          <Form.Item key={'activeMessageIndex'} label={'Message'}>
            <Select
              onChange={(val) =>
                setStore({ ...store, activeMessageIndex: val })
              }
              placeholder={'Please select'}
              size="small"
              value={store?.activeMessageIndex}
            >
              {messagesOptions.map((item) => (
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

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <CopyTextArea setText={setText} text={text} />

        <Button
          block
          icon={<MailOutlined />}
          onClick={handleSend}
          size="large"
          type="primary"
        >
          Open E-Mail
        </Button>
      </Space>
    </div>
  )
}
