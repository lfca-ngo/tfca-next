import { Button, Form, Modal } from 'antd'
import React, { useEffect } from 'react'

import { useConfetti } from '../../../hooks/useChallenge'
import { useLists } from '../../../hooks/useTranslation'
import { text } from '../../../utils/Text'
import CheckList from '../../Elements/CheckList'
import { NominateNameInput } from '../../Elements/NominateInput'
import Category from './Category'

const Success = (props) => {
  const { goTo, setProgress } = props
  const benefits = useLists('sharing.benefits')
  const [isGeneratingToken, setIsGeneratingToken] = React.useState(false)

  useConfetti() // creates confetti

  useEffect(() => {
    setProgress(1)
    // fireConfetti()
  }, [setProgress])

  return (
    <>
      <div className="step">
        <Category
          title={text(props.blocks['category.title'])}
          type={props.name}
        />
        <h2>
          High five! Planet Erde sagt Danke. Nominiere 3 Freunde und
          verdreifache deinen Impact!
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
            <NominateNameInput
              // onFocus={() => trackEvent('start_invite', { field: '1' })}
              placeholder="Tina"
            />
          </Form.Item>
          <Form.Item name="invitee2">
            <NominateNameInput
              // onFocus={() => trackEvent('start_invite', { field: '2' })}
              placeholder="Peter"
            />
          </Form.Item>
          <Form.Item name="invitee3">
            <NominateNameInput
              // onFocus={() => trackEvent('start_invite', { field: '3' })}
              placeholder="Luisa"
            />
          </Form.Item>
          <Form.Item>
            <Button block htmlType="submit" size="large" type="primary">
              Freunde einladen
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Loading modal while generating shareToken */}
      <Modal
        closable={false}
        footer={null}
        visible={isGeneratingToken}
        wrapClassName={`modal-md ${props.color} has-top`}
      >
        <h3>Generating link...</h3>
      </Modal>
    </>
  )

  async function handleFinish({ invitee1, invitee2, invitee3 }) {
    setIsGeneratingToken(true)
    // Gereate the share token
    const payload = {
      invitee1,
      invitee2,
      invitee3,
      // TODO: Get sender Info from challenge inputs?
      sender: {
        challenge: 'energy',
        name: 'DavidStatic',
      },
    }

    const response = await fetch('/api/create-share-token', {
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { token } = await response.json()
    props.setStore({
      ...props.store,
      shareToken: token,
    })

    goTo('share')
  }
}

export default Success
