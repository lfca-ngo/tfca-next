import { GlobalOutlined, HeartOutlined, RiseOutlined } from '@ant-design/icons'
import { Button, Form, Input, List, Select } from 'antd'
import React, { useEffect, useState } from 'react'

import { useConfetti } from '../../../hooks/useChallenge'
import { text } from '../../../utils/Text'
// import useAnalytics from '../../../hooks/useAnalytics'
import Category from '../Category'

const { Option } = Select

const ARGS = [
  {
    icon: <RiseOutlined />,
    text: 'Gemeinsam können wir ein Zeichen setzen: Lade deine Freunde mit einer persönlichen Nachricht ein mitzumachen',
  },
  {
    icon: <GlobalOutlined />,
    text: 'Unsicher ob sie bereits Ökostrom nutzen? Kein Problem, dann wird es nur ein schneller Check-in',
  },
  {
    icon: <HeartOutlined />,
    text: 'Kein Social Media Mensch? Kein Problem, teile die Challenge einfach über WhatsApp oder SMS!',
  },
]

const Success = (props) => {
  // const { trackEvent } = useAnalytics()
  const fireConfetti = useConfetti()

  useEffect(() => {
    props.setProgress(1)
    fireConfetti()
  }, [])

  const handleFinish = (values) => {
    props.onFinish()
    // trackEvent('invite', { ...values })
  }

  const challengeSelect = (
    <Select defaultValue={'1'} style={{ width: 120 }}>
      <Option value="1">Energy</Option>
    </Select>
  )

  return (
    <div className="step">
      <Category
        title={text(props.blocks['category.title'])}
        type={props.name}
      />
      <h2>
        High five! Planet Erde sagt Danke. Nominiere 3 Freunde und verdreifache
        deinen Impact!
      </h2>

      <List
        className="simple-list"
        dataSource={ARGS}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta avatar={item.icon} description={item.text} />
          </List.Item>
        )}
      />

      <Form onFinish={handleFinish} style={{ marginTop: '20px' }}>
        <Form.Item
          name="invitee1"
          rules={[
            {
              message: 'Bitte lade mindestens eine Person ein',
              required: true,
            },
          ]}
        >
          <Input
            addonAfter={challengeSelect}
            onFocus={() => trackEvent('start_invite', { field: '1' })}
            placeholder="Tina"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item name="invitee2">
          <Input
            addonAfter={challengeSelect}
            onFocus={() => trackEvent('start_invite', { field: '2' })}
            placeholder="Peter"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item name="invitee3">
          <Input
            addonAfter={challengeSelect}
            onFocus={() => trackEvent('start_invite', { field: '3' })}
            placeholder="Luisa"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item>
          <Button block htmlType="submit" size="large" type="primary">
            Freunde einladen
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Success
