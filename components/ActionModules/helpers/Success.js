import {
  MinusCircleOutlined,
  PlusOutlined,
  SendOutlined,
} from '@ant-design/icons'
import { Alert, Button, Divider, Drawer, Form, Input } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { useConfetti, useContentBlocks, useContentLists } from '../../../hooks'
import { trackEvent } from '../../../services/analytics'
import { getCookie, getWindowUid, UID_COOKIE_NAME } from '../../../utils'
import { text } from '../../../utils/Text'
import { CheckList } from '../../Elements/CheckList'
import { LoadingSpinner } from '../../Elements/LoadingSpinner'
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

  const { locale, query } = useRouter()
  const { actionCollectionSlug } = query

  useConfetti()

  useEffect(() => {
    trackEvent({
      name: 'action_completed',
      values: { action_id: id },
    })
  }, [id])

  const socialDescription = text(useContentBlocks('header.body'))
  const socialTitle = useContentBlocks('header.title.custom')
  const fallbackName = text(
    useContentBlocks('header.title.recipients.fallback')
  )

  // create multiple invite links
  // map of promises with infos
  const createInvites = async (values) => {
    const sender = values.sender ? values.sender : undefined
    const invites = values.names.map(
      (name) => () =>
        createInvite({
          names: name ? [name] : undefined,
          sender,
        })
    )
    if (values.names.length > 1) {
      // Add a multi invite
      invites.push(() =>
        createInvite({
          names: values.names,
          sender,
        })
      )
    }

    // If no name is entered, a general invite will ge genrated already
    // This will only add a general invite on top of individual ones
    if (values.names[0]) {
      // Add a general invite
      invites.push(() =>
        createInvite({
          sender,
        })
      )
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
        <h2>{text(useContentBlocks('sharing.nominate.title'))}</h2>

        <CheckList data={benefits} />

        <Form
          className="dynamic-form"
          initialValues={{ names: [''] }}
          layout="vertical"
          name="dynamic_invitees"
          onFinish={createInvites}
        >
          <Form.Item name="sender">
            <Input placeholder="Your Name" />
          </Form.Item>

          <Divider />

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
                      rules={
                        fields.length > 1
                          ? [
                              {
                                message:
                                  'Please input a name or delete this field.',
                                required: true,
                              },
                            ]
                          : undefined
                      }
                      validateTrigger={['onChange', 'onBlur']}
                    >
                      <Input placeholder="A Friend's Name" />
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
              <LoadingSpinner className="dark" label="...generating link" />
            ) : (
              <Share actionInviteText={imageInviteText} invites={invites} />
            )}
          </div>
        )}
      </Drawer>
    </>
  )

  async function createInvite({ names, sender }) {
    setError('')
    // Gereate the share token
    try {
      const response = await fetch('/api/create-shareable-link', {
        body: JSON.stringify({
          actionCollectionSlug,
          actionId: id,
          color: imageInviteColor,
          locale,
          message: imageInviteText,
          names,
          sender,
          socialDescription,
          socialTitle: text(socialTitle, {
            name: names?.length === 1 && names[0] ? names[0] : fallbackName,
          }).replace(/\*/g, ''),
          uid: getCookie(UID_COOKIE_NAME) || getWindowUid(),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const { ogImageUrl, shortLink } = await response.json()

      return {
        names,
        ogImageUrl,
        shortLink,
      }
    } catch (e) {
      setError('Failed to generate link')
    }
  }
}
