import { LoadingOutlined } from '@ant-design/icons'
import {
  MinusCircleOutlined,
  PlusOutlined,
  SendOutlined,
} from '@ant-design/icons'
import { Alert, Button, Drawer, Form, Input } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { useConfetti, useContentBlocks, useContentLists } from '../../../hooks'
import { trackEvent } from '../../../services/analytics'
import { getCookie, getWindowUid, UID_COOKIE_NAME } from '../../../utils'
import { text } from '../../../utils/Text'
import CheckList from '../../Elements/CheckList'
import Category from './Category'
import { Share } from './Share'

const MAX_INVITES = 3

export const Success = ({
  goTo,
  module: { blocks = {}, id, imageInviteText, imageInviteColor, icon = {} },
  prevKey,
}) => {
  const benefits = useContentLists('sharing.benefits')?.items
  const [isGeneratingToken, setIsGeneratingToken] = React.useState(false)
  const [error, setError] = React.useState('')
  const [visible, setVisible] = React.useState('')
  const [invites, setInvites] = React.useState([])

  const router = useRouter()
  const { actionCollectionSlug } = router.query

  useConfetti()

  useEffect(() => {
    trackEvent({
      name: 'action_completed',
      values: { action_id: id },
    })
  }, [id])

  const socialDescription = text(useContentBlocks('header.body'))
  const socialTitle = useContentBlocks('header.title.custom')
  const socialNameFallback = text(
    useContentBlocks('header.title.recipients.fallback')
  )

  // create multiple invite links
  // map of promises with infos
  const createInvites = async (values) => {
    const invites = values.names.map((name) => () => createInvite([name]))
    if (values.names.length > 1) {
      // Add a miulti invite
      invites.push(() => createInvite(values.names))
    }

    setVisible(true)
    setIsGeneratingToken(true)

    const results = await Promise.all(invites.map((invite) => invite()))
    setIsGeneratingToken(false)
    setInvites(results)
  }

  return (
    <>
      <div className="step">
        <Category
          goBack={prevKey ? () => goTo(prevKey) : undefined}
          icon={icon.url}
          title={text(blocks['category.title'])}
        />
        <h2>{text(useContentBlocks('sharing.headline'))}</h2>

        <CheckList data={benefits?.items} />
        <Form
          className="dynamic-form"
          initialValues={{ names: [''] }}
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
                      <Input placeholder="Name" />
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
      >
        {error ? (
          <h3>{error}</h3>
        ) : (
          <div>
            {isGeneratingToken ? (
              <LoadingOutlined />
            ) : (
              <Share imageInviteText={imageInviteText} invites={invites} />
            )}
          </div>
        )}
      </Drawer>
    </>
  )

  async function createInvite(names) {
    setError('')
    // Gereate the share token
    try {
      const response = await fetch('/api/create-shareable-link', {
        body: JSON.stringify({
          actionCollectionSlug,
          actionId: id,
          color: imageInviteColor,
          message: imageInviteText,
          names,
          socialDescription,
          socialTitle: text(socialTitle, {
            name: names.length === 1 ? names[0] : socialNameFallback,
          }).replace(/\*/g, ''),
          uid: getCookie(UID_COOKIE_NAME) || getWindowUid(),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const data = await response.json()

      return {
        ...data,
        actionId: id,
        names,
      }
    } catch (e) {
      setError('Failed to generate link')
    }
  }
}
