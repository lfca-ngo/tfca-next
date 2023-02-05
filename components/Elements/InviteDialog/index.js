require('./styles.less')

import {
  InfoCircleOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SendOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { Alert, Button, Collapse, Divider, Form, Input, message } from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import {
  useContentBlocks,
  useContentLists,
  useCustomization,
  useUserId,
} from '../../../hooks'
import { useUserScore } from '../../../services/internal/userscore'
import { textBlockToString } from '../../../utils'
import { CheckList, LoadingSpinner, SuperText } from '../../Elements'
import { Share } from './Share'

const { Panel } = Collapse

const CREATE = 'create'
const RESULTS = 'results'

const { useForm } = Form

const MAX_INVITES = 10
const NAMES = ['Carla', 'Yasmin', 'Kim']

export const InviteDialog = ({
  actionId,
  imageInviteColor = 'blue',
  imageInviteText = 'I took action|for a brighter|tomorrow',
  // otherUsers = 49,
}) => {
  const customization = useCustomization()
  const userId = useUserId()
  const { data, isLoading } = useUserScore(userId)
  const user = data?.user
  const benefits = useContentLists('sharing.benefits')?.items
  const [isGeneratingToken, setIsGeneratingToken] = useState(false)
  const [activeCollapseKey, setActiveCollapseKey] = useState(CREATE)
  const [invites, setInvites] = useState([])
  const [form] = useForm()

  const { locale, query } = useRouter()
  const { actionCollectionSlug, team } = query
  const isPartOfTeam = !!team

  // team can be set in customization or in db
  const teamId = user?.teamId || team
  const userName = user?.name || customization?.invitedUserName

  const addInvite = textBlockToString(
    useContentBlocks('sharing.button.addinvite')
  )
  const errorMaxFriends = textBlockToString(
    useContentBlocks('sharing.error.maxfriends')
  )
  const socialDescription = textBlockToString(useContentBlocks('header.body'))
  const socialTitle = useContentBlocks('header.title.custom')

  // create multiple invite links
  // map of promises with infos
  const createInvites = async (values) => {
    const sender = values.sender ? values.sender : undefined
    const invites = values.names.map(
      (name) => () =>
        createInvite({
          name: name,
          sender,
        })
    )

    // Always add a generic invite
    invites.push(() =>
      createInvite({
        sender,
      })
    )

    setIsGeneratingToken(true)

    const results = await Promise.all(invites.map((invite) => invite()))
    setIsGeneratingToken(false)
    setInvites(results)
    setActiveCollapseKey(RESULTS)
  }

  const createInvite = async ({ name, sender }) => {
    // Generate the share token
    try {
      const response = await fetch('/api/create-shareable-link', {
        body: JSON.stringify({
          actionCollectionSlug: actionCollectionSlug || '',
          actionId: actionId,
          color: imageInviteColor,
          invitedUserName: name,
          locale,
          message: imageInviteText,
          referredByTeamId: customization?.referredByTeamId || null, // this is the team that the inviting user was invited by, can be null
          referredByUserId: customization?.referredByUserId || null, // this is the uid of the user that invited the inviting user, can be null
          senderName: sender,
          socialDescription: socialDescription,
          socialTitle: textBlockToString(socialTitle, {
            name: name || '',
          }).replace(/\*/g, ''),
          teamId: teamId, // this is the teamId of the inviting user
          userId: userId, // this is the uid of the inviting user
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      const { invitedUserId, ogImageUrl, shortLink } = await response.json()

      return {
        invitedUserId,
        name,
        ogImageUrl,
        shortLink,
      }
    } catch (e) {
      message.error('Failed to create sharing link')
    }
  }

  // prepopulate the team id
  useEffect(() => {
    if (teamId) {
      form.setFieldsValue({ team: teamId?.toLocaleUpperCase() })
    }
  }, [form, teamId])

  // prepopulate the name
  useEffect(() => {
    if (userName) {
      form.setFieldsValue({ sender: userName })
    }
  }, [form, userName])

  return (
    <div className="invite-dialog">
      <SuperText text={'Share the challenge'} />
      <h2>Invite friends to join the challenge</h2>
      <p>
        {teamId
          ? `You are part of the ${teamId?.toLocaleUpperCase()} team. `
          : ''}
        Every friend that clicks on your invitation and/or takes action, adds
        points to your score. Win the challenge and help our planet!
      </p>

      <CheckList data={benefits} vars={{ users: 'Hundreds of' }} />

      <Collapse
        accordion
        activeKey={activeCollapseKey}
        onChange={(key) => setActiveCollapseKey(key)}
      >
        <Panel header="Create Invites" key={CREATE}>
          <Form
            className="dynamic-form"
            form={form}
            initialValues={{ names: [''] }}
            layout="vertical"
            name="dynamic_invitees"
            onFinish={createInvites}
          >
            {teamId && (
              <Form.Item label="Your team" name="team">
                <Input disabled placeholder="Your team code" />
              </Form.Item>
            )}

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
        </Panel>
        <Panel
          extra={(isGeneratingToken || isLoading) && <LoadingOutlined />}
          header={'Your invite links'}
          key={RESULTS}
        >
          {isGeneratingToken ? (
            <LoadingSpinner
              additionalSpinnerProps={{ color: 'pink', type: 'home' }}
              className="dark"
              label={'...loading'}
            />
          ) : (
            <>
              {invites && invites.length > 0 ? (
                <Share invites={invites} />
              ) : (
                'Use the form above to create your custom invite links!'
              )}
            </>
          )}
        </Panel>
      </Collapse>
    </div>
  )
}
