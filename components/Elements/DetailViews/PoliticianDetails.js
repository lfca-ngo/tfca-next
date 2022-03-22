require('./politicianDetails.less')

import { MailOutlined } from '@ant-design/icons'
import { Button, Form, Select, Space } from 'antd'
import React, { useEffect } from 'react'

import { text as replaceVars } from '../../../utils/Text'
import { CopyTextArea } from '../CopyTextArea'
import { ScrollableFilters } from '../ScrollableFilters'

export const PoliticianDetails = ({
  activeMessageIndex,
  availableFilters,
  item,
  messages,
  messagesRelatedFilterKey,
  onFinish,
  setStore,
  store,
}) => {
  const [subject, setSubject] = React.useState('')
  const [text, setText] = React.useState('')

  useEffect(() => {
    const activeMessage = messages[activeMessageIndex]
    setSubject(
      replaceVars(activeMessage.subject, {
        name: item.name,
      })
    )
    setText(replaceVars(activeMessage.text, { name: item.name }))
  }, [messages, activeMessageIndex, item])

  const handleSend = () => {
    const mailToLink = `mailto:${
      item.email
    }?subject=${subject}&cc=politics@lfca.earth&body=${encodeURIComponent(
      text
    )}`
    window.location.href = mailToLink
    // remove selectedItem aka politician
    // from store and add to sentItems
    const { selectedPoliticians, sentItems } = store
    const newSentItems = [...sentItems, item]
    selectedPoliticians.splice(store?.politicianSlideIndex, 1)
    setStore({
      ...store,
      selectedPoliticians,
      sentItems: newSentItems,
    })
    // once all politicians are sent, go to next step
    if (selectedPoliticians.length === 0) onFinish()
  }

  const messagesOptions = messages.map((m, i) => ({
    label: `Message ${i + 1}`,
    value: i,
  }))

  return (
    <div className="politician-detail-view">
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
          (f) => f.fieldName === messagesRelatedFilterKey
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
          E-Mail
        </Button>
      </Space>
    </div>
  )
}
