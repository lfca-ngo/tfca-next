import { Button, Form, Input, List, Select } from 'antd'
import React, { useEffect } from 'react'

import { useConfetti } from '../../../hooks/useChallenge'
import { useLists } from '../../../hooks/useTranslation'
import { text } from '../../../utils/Text'
import CheckList from '../../Elements/CheckList'
import Category from '../Category'

const { Option } = Select

const Success = (props) => {
  const { setProgress } = props
  const benefits = useLists('sharing.benefits')

  useConfetti() // creates confetti

  useEffect(() => {
    setProgress(1)
    // fireConfetti()
  }, [setProgress])

  const handleFinish = (values) => {
    props.onFinish()
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

      <CheckList data={benefits?.items} />

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
