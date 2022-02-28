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
  const [error, setError] = React.useState('')

  useConfetti() // creates confetti

  useEffect(() => {
    setProgress(1)
    // fireConfetti()
  }, [setProgress])

  return (
    <>
      <div className="step">
        <Category
          icon={props.icon}
          title={text(props.blocks['category.title'])}
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
        closable={!!error}
        footer={null}
        onCancel={() => setError('')}
        visible={isGeneratingToken || error}
        wrapClassName={`modal-md ${props.color} has-top`}
      >
        {error ? <h3>{error}</h3> : <h3>Generating link...</h3>}
      </Modal>
    </>
  )

  async function handleFinish({ invitee1, invitee2, invitee3 }) {
    setIsGeneratingToken(true)
    // Gereate the share token
    const tokenPayload = {
      invitee1,
      invitee2,
      invitee3,
      // TODO: Get sender Info from challenge inputs?
      sender: {
        challenge: 'energy',
        name: 'DavidStatic',
      },
    }

    try {
      const response = await fetch('/api/create-shareable-link', {
        // TODO: Dynamically set actionCollectionSlug
        body: JSON.stringify({
          actionCollectionSlug: 'new',
          tokenPayload,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const { shortLink } = await response.json()
      props.setStore({
        ...props.store,
        shareLink: shortLink,
      })

      goTo('share')
    } catch (e) {
      setError('Failed to generate link')
      setIsGeneratingToken(false)
    }
  }
}

export default Success
