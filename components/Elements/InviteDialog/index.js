require('./styles.less')

import {
  InfoCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SendOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { Alert, Button, Divider, Form, Input } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import {
  useContentBlocks,
  useContentLists,
  // useCustomization,
} from '../../../hooks'
import { textBlockToString } from '../../../utils'
import { getCookie, getWindowUid, UID_COOKIE_NAME } from '../../../utils'
import { CheckList, LoadingSpinner } from '../../Elements'
import { Share } from '../../Share'

const { useForm } = Form

const MAX_INVITES = 5
const NAMES = ['Carla', 'Yasmin', 'Kim']

export const InviteDialog = ({ otherUsers = 49 }) => {
  const benefits = useContentLists('sharing.benefits')?.items
  const [isGeneratingToken, setIsGeneratingToken] = useState(false)
  const [error, setError] = useState('')
  const [invites, setInvites] = useState([])
  const [form] = useForm()

  // const customization = useCustomization()
  const { locale, query } = useRouter()
  const { actionCollectionSlug, team } = query
  const isPartOfTeam = !!team

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

    // If no name is entered, a general invite will be generated
    // This will only add a general invite on top of individual ones
    if (values.names[0]) {
      // Add a general invite
      invites.push(() =>
        createInvite({
          sender,
        })
      )
    }

    // setVisible(true)
    setIsGeneratingToken(true)

    const results = await Promise.all(invites.map((invite) => invite()))
    setIsGeneratingToken(false)
    setInvites(results)
  }

  const createInvite = async ({ names, sender }) => {
    setError('')
    // Generate the share token
    try {
      const response = await fetch('/api/create-shareable-link', {
        body: JSON.stringify({
          actionCollectionSlug,
          // actionId: id,
          // color: imageInviteColor,
          locale,
          message: 'jo',
          names,
          sender,
          socialDescription: 'jo',
          socialTitle: 'title',
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

  const addInvite = textBlockToString(
    useContentBlocks('sharing.button.addinvite')
  )
  const errorMaxFriends = textBlockToString(
    useContentBlocks('sharing.error.maxfriends')
  )

  useEffect(() => {
    if (team) {
      form.setFieldsValue({ team: team?.toLocaleUpperCase() })
    }
  }, [form, team])

  return (
    <div className="invite-dialog">
      <h1>Invite friends</h1>
      <p>
        You are part of the {`${team?.toLocaleUpperCase()}`} team! Every friend
        that clicks on your invitation and/or takes action, adds points to your
        internal team score. Win the challenge and help our planet!
      </p>

      <CheckList data={benefits} vars={{ users: otherUsers }} />

      <Divider />

      <Form
        className="dynamic-form"
        form={form}
        initialValues={{ names: [''] }}
        layout="vertical"
        name="dynamic_invitees"
        onFinish={createInvites}
      >
        <Form.Item label="Your team" name="team">
          <Input disabled placeholder="Your team code" />
        </Form.Item>

        <Form.Item
          label="Your nickname"
          name="sender"
          rules={[
            {
              required: isPartOfTeam,
            },
          ]}
        >
          <Input
            addonBefore={<InfoCircleOutlined />}
            data-testid="success-own-name-input"
            placeholder={'Greta12'}
          />
        </Form.Item>

        <Divider />

        <Form.List
          name="names"
          rules={[
            {
              validator: async (_, names) => {
                if (!names || names.length > MAX_INVITES) {
                  return Promise.reject(new Error(`Max ${MAX_INVITES} invites`))
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, i) => (
                <Form.Item key={field.key} required={false}>
                  <Form.Item
                    {...field}
                    label="Your friends first name"
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
                      data-testid="success-friend-name-input"
                      placeholder={`e.g. ${NAMES[i % 3]}`}
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
                    data-testid="success-add-name-input-btn"
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
            data-testid="success-share-submit-btn"
            htmlType="submit"
            icon={<SendOutlined />}
            size="large"
            style={{ marginTop: '20px' }}
            type="primary"
          >
            Create invite links
          </Button>
        </Form.Item>
      </Form>

      <div>
        {isGeneratingToken ? (
          <LoadingSpinner
            additionalSpinnerProps={{ color: 'pink', type: 'home' }}
            className="dark"
            label={'...loading'}
          />
        ) : (
          <>{invites && <Share invites={invites} />}</>
        )}
      </div>
    </div>
  )
}
