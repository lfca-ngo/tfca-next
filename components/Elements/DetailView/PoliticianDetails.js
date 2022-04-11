require('./politicianDetails.less')

import { MailOutlined } from '@ant-design/icons'
import { Button, Form, Space } from 'antd'
import React, { useEffect } from 'react'

import { getMailToLink } from '../../../utils'
import { text as replaceVars } from '../../../utils/text'
import { CopyTextArea } from '../CopyTextArea'
import { DropdownSelect } from '../DropdownSelect'
import { ScrollableFilters } from '../ScrollableFilters'

export const PoliticianDetails = ({
  activeMessageIndex,
  availableFilters,
  blocks,
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
    const mailToLink = getMailToLink({
      body: text,
      cc: 'politics@lfca.earth',
      subject,
      to: item.email,
    })
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
    value: `${i}`,
  }))

  return (
    <div className="detail-view politician">
      <ScrollableFilters
        additionalItems={[
          <Form.Item key={'activeMessageIndex'} label={'Message'}>
            <DropdownSelect
              items={messagesOptions}
              onSelect={(val) =>
                setStore({ ...store, activeMessageIndex: val })
              }
              singleMode
            />
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
          {replaceVars(blocks['contact.button.primary'])}
        </Button>
      </Space>
    </div>
  )
}
