import {
  InfoCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SendOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { Alert, Button, Divider, Drawer, Form, Input } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import {
  useAnalytics,
  useConfetti,
  useContentBlocks,
  useContentLists,
} from '../../hooks'
import { ACTION_COMPLETED } from '../../services/analytics'
import {
  getCookie,
  getWindowUid,
  textBlockToString,
  UID_COOKIE_NAME,
} from '../../utils'
import { Category, CheckList, LoadingSpinner } from '../Elements'
import { Share } from '../Share'

const MAX_INVITES = 3

export const Success = ({
  goTo,
  module: {
    blocks = {},
    id,
    imageInviteText,
    imageInviteColor,
    icon = {},
    otherUsers = 49,
  },
  prevKey,
}) => {
  const benefits = useContentLists('sharing.benefits')?.items
  const [isGeneratingToken, setIsGeneratingToken] = useState(false)
  const [error, setError] = useState('')
  const [visible, setVisible] = useState('')
  const [invites, setInvites] = useState([])

  const { locale, query } = useRouter()
  const { actionCollectionSlug } = query
  const { trackEvent } = useAnalytics()

  useConfetti()

  useEffect(() => {
    trackEvent({
      name: ACTION_COMPLETED,
      values: { action_id: id },
    })
  }, [id, trackEvent])

  const buttonPrimary = textBlockToString(
    useContentBlocks('sharing.button.primary')
  )
  const addInvite = textBlockToString(
    useContentBlocks('sharing.button.addinvite')
  )
  const errorMaxFriends = textBlockToString(
    useContentBlocks('sharing.error.maxfriends')
  )
  const yourNameInput = textBlockToString(
    useContentBlocks('sharing.input.yourname')
  )
  const friendsNameInput = textBlockToString(
    useContentBlocks('sharing.input.friendsname')
  )
  const socialDescription = textBlockToString(useContentBlocks('header.body'))
  const socialTitle = useContentBlocks('header.title.custom')
  const fallbackName = textBlockToString(
    useContentBlocks('header.title.recipients.fallback')
  )
  const linkGenerationLabel = textBlockToString(
    useContentBlocks('challenge.status.create.link')
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
          title={textBlockToString(blocks['category.title'])}
        />
        <h2>{textBlockToString(useContentBlocks('sharing.nominate.title'))}</h2>

        <CheckList data={benefits} vars={{ users: otherUsers }} />

        <Form
          className="dynamic-form"
          initialValues={{ names: [''] }}
          layout="vertical"
          name="dynamic_invitees"
          onFinish={createInvites}
        >
          <Form.Item name="sender">
            <Input
              addonBefore={<InfoCircleOutlined />}
              placeholder={yourNameInput}
            />
          </Form.Item>

          <Divider style={{ margin: '10px 0 24px', opacity: '0.2' }} />

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
                      <Input
                        addonBefore={<UserAddOutlined />}
                        placeholder={friendsNameInput}
                      />
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
                  <Alert message={errorMaxFriends} showIcon type="info" />
                ) : (
                  <Form.Item>
                    <Button
                      block
                      ghost
                      icon={<PlusOutlined />}
                      onClick={() => add()}
                      type="dashed"
                    >
                      {addInvite}
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
              {buttonPrimary}
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
              <LoadingSpinner
                additionalSpinnerProps={{ color: 'pink', type: 'home' }}
                className="dark"
                label={linkGenerationLabel}
              />
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
          socialTitle: textBlockToString(socialTitle, {
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
