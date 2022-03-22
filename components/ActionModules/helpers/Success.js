import { LoadingOutlined } from '@ant-design/icons'
import {
  MinusCircleOutlined,
  PlusOutlined,
  SendOutlined,
} from '@ant-design/icons'
import { Alert, Button, Drawer, Form } from 'antd'
import React from 'react'

import {
  useConfetti,
  useContentBlocks,
  useContentLists,
  useIsMobile,
} from '../../../hooks'
import { useTrackEvent } from '../../../services/analytics'
import { text } from '../../../utils/Text'
import CheckList from '../../Elements/CheckList'
import { NominateNameInput } from '../../Elements/NominateInput'
import Category from './Category'
import { Share } from './Share'

const MAX_INVITES = 3

export const Success = ({ goTo, icon, id, moduleBlocks, prevKey }) => {
  const isMobile = useIsMobile()
  const benefits = useContentLists('sharing.benefits')
  const [isGeneratingToken, setIsGeneratingToken] = React.useState(false)
  const [error, setError] = React.useState('')
  const [visible, setVisible] = React.useState('')
  const [invites, setInvites] = React.useState([])

  useConfetti()
  useTrackEvent({ name: 'action_completed', values: { action_id: id } })

  // create multiple invite links
  // map of promises with infos
  const createInvites = async (values) => {
    const singleInvites = values.names.map((name) => () => createInvite([name]))
    const allInvites = [...singleInvites, () => createInvite(values.names)]

    setVisible(true)
    setIsGeneratingToken(true)

    const results = await Promise.all(allInvites.map((invite) => invite()))
    setIsGeneratingToken(false)
    setInvites(results)
  }

  return (
    <>
      <div className="step">
        <Category
          goBack={prevKey ? () => goTo(prevKey) : undefined}
          icon={icon}
          title={text(moduleBlocks['category.title'])}
        />
        <h2>{text(useContentBlocks('sharing.headline'))}</h2>

        <CheckList data={benefits?.items} />
        <Form
          className="dynamic-form"
          initialValues={{ names: [{ challenge: 'Energy', name: null }] }}
          layout="vertical"
          name="dynamic_invitees"
          onFinish={createInvites}
        >
          <Form.List
            name="names"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length > MAX_INVITES) {
                    return Promise.reject(
                      new Error(`Max ${MAX_INVITES} invites`)
                    )
                  }
                },
              },
            ]}
          >
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field) => (
                  <Form.Item key={field.key} required={false}>
                    <Form.Item
                      {...field}
                      rules={[
                        {
                          message: 'Please input a name or delete this field.',
                          required: true,
                        },
                      ]}
                      validateTrigger={['onChange', 'onBlur']}
                    >
                      <NominateNameInput placeholder="Name" />
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        onClick={() => remove(field.name)}
                      />
                    ) : null}
                  </Form.Item>
                ))}

                {fields.length >= MAX_INVITES ? (
                  <Alert
                    message={`You can nominate max. 3 friends personally but share a
                  general link to invite even more!`}
                    showIcon
                    type="info"
                  />
                ) : (
                  <Form.Item>
                    <Button
                      block
                      ghost
                      icon={<PlusOutlined />}
                      onClick={() => add()}
                      type="dashed"
                    >
                      Add invitee
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                )}
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button
              block
              htmlType="submit"
              icon={<SendOutlined />}
              size="large"
              style={{ marginTop: '20px' }}
              type="primary"
            >
              Open invite dialog
            </Button>
          </Form.Item>
        </Form>
      </div>

      {/* Show progress in drawer */}
      <Drawer
        className={`drawer-md`}
        footer={null}
        onClose={() => setVisible(false)}
        visible={visible}
        width={isMobile ? '100%' : '700px'}
      >
        {error ? (
          <h3>{error}</h3>
        ) : (
          <div>
            {isGeneratingToken ? (
              <LoadingOutlined />
            ) : (
              <Share invites={invites} />
            )}
          </div>
        )}
      </Drawer>
    </>
  )

  async function createInvite(invitees) {
    const [invitee1, invitee2, invitee3] = invitees
    const multiInvite = invitees.length > 1
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
          actionCollectionSlug: 'int',
          tokenPayload,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const data = await response.json()

      return {
        ...data,
        challenge: multiInvite ? 'All' : invitee1?.challenge,
        name: multiInvite ? 'All' : invitee1?.name,
      }
    } catch (e) {
      setError('Failed to generate link')
    }
  }
}
