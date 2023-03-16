require('./styles.less')

import {
  CopyOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  SendOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import {
  Alert,
  Button,
  Col,
  Collapse,
  Divider,
  Form,
  Input,
  message,
  Row,
} from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import {
  useContentBlocks,
  useContentLists,
  useCustomization,
  useUserId,
} from '../../../hooks'
import {
  useCreateUniqueUserName,
  useCreateUser,
} from '../../../services/internal/username'
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
  const { actionCollectionSlug, teamId: queryTeamId } = query
  const isPartOfTeam = !!queryTeamId

  // team can be set in customization or in db
  const teamId = user?.teamId || queryTeamId
  const userName = user?.name || customization?.invitedUserName

  const addInvite = textBlockToString(
    useContentBlocks('sharing.button.addinvite')
  )
  const errorMaxFriends = textBlockToString(
    useContentBlocks('sharing.error.maxfriends')
  )
  const mainSupertext = textBlockToString(useContentBlocks('sharing.title.sup'))
  const mainTitle = textBlockToString(useContentBlocks('sharing.title'))
  const mainBody = textBlockToString(useContentBlocks('sharing.hint'))
  const mainTeamBody = textBlockToString(
    useContentBlocks('sharing.team.body'),
    { team: teamId?.toLocaleUpperCase() }
  )
  const panelTitle = textBlockToString(useContentBlocks('sharing.panel.title'))
  const sharingInputTeamLabel = textBlockToString(
    useContentBlocks('sharing.input.team.label')
  )
  const sharingInputTeamPlaceholder = textBlockToString(
    useContentBlocks('sharing.input.team.placeholder')
  )
  const sharingInputNicknameLabel = textBlockToString(
    useContentBlocks('sharing.input.nickname.label')
  )
  const sharingInputFriendsNameLabel = textBlockToString(
    useContentBlocks('sharing.input.friendsname.label')
  )
  const sharingButtonCreateLinks = textBlockToString(
    useContentBlocks('sharing.button.create.links')
  )
  const sharingInviteWaitingMessage = textBlockToString(
    useContentBlocks('sharing.invite.waiting.message')
  )
  const sharingInviteTitle = textBlockToString(
    useContentBlocks('sharing.links.title')
  )
  const socialDescription = textBlockToString(useContentBlocks('header.body'))
  const socialTitle = useContentBlocks('header.title.custom')

  const {
    data: userNameData,
    isLoading: isCreatingUserName,
    mutate: createUniqueUserName,
  } = useCreateUniqueUserName()

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

  const validateUserName = () => {
    if (form.isFieldTouched('senderFirstName')) {
      createUniqueUserName({
        firstName: form.getFieldValue('senderFirstName'),
        teamId: teamId,
        userId: userId,
      })
    }
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

  const userNameServer = userNameData?.data?.userName

  useEffect(() => {
    if (userNameServer) {
      form.setFieldsValue({ senderUserName: userNameServer })
    }
  }, [form, userNameServer])

  useEffect(() => {
    if (userId) {
      form.setFieldsValue({ userId: userId })
    }
  }, [form, userId])

  return (
    <div className="invite-dialog">
      <SuperText text={mainSupertext} />
      <h2>{mainTitle}</h2>
      <p>
        {teamId ? mainTeamBody : null}
        {mainBody}
      </p>

      <CheckList data={benefits} />

      <Collapse
        accordion
        activeKey={activeCollapseKey}
        onChange={(key) => setActiveCollapseKey(key)}
      >
        <Panel header={panelTitle} key={CREATE}>
          <Form
            className="dynamic-form"
            form={form}
            initialValues={{ names: [''] }}
            layout="vertical"
            name="dynamic_invitees"
            onFinish={createInvites}
          >
            {teamId && (
              <Form.Item label={sharingInputTeamLabel} name="team">
                <Input disabled placeholder={sharingInputTeamPlaceholder} />
              </Form.Item>
            )}

            <Form.Item
              label={'First name'}
              name="senderFirstName"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                data-testid="success-own-name-input"
                onBlur={validateUserName}
                placeholder={'Greta12'}
              />
            </Form.Item>

            {teamId && (
              <>
                <p>
                  Save your unique nickname and login key to continue playing
                  from a different device and identify yourself on your teams
                  leaderboard.
                </p>

                <Row gutter={16}>
                  <Col md={12} xs={24}>
                    <Form.Item label="User name">
                      <Input.Group compact>
                        <Form.Item
                          name="senderUserName"
                          noStyle
                          rules={[
                            {
                              required: isPartOfTeam,
                            },
                          ]}
                        >
                          <Input
                            data-testid="success-own-name-input"
                            disabled
                            placeholder={'Greta12'}
                            style={{ width: '80%' }}
                          />
                        </Form.Item>

                        <CopyToClipboard
                          onCopy={() => {
                            message.success('Copied user name')
                          }}
                          text={form.getFieldValue('senderUserName')}
                        >
                          <Button
                            icon={<CopyOutlined />}
                            style={{ width: '20%' }}
                            type="primary"
                          />
                        </CopyToClipboard>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                  <Col md={12} xs={24}>
                    <Form.Item label="Login key">
                      <Input.Group compact>
                        <Form.Item
                          name="userId"
                          noStyle
                          rules={[
                            {
                              required: isPartOfTeam,
                            },
                          ]}
                        >
                          <Input
                            disabled
                            placeholder={'abcd1234'}
                            style={{ width: '80%' }}
                          />
                        </Form.Item>
                        <CopyToClipboard
                          onCopy={() => {
                            message.success('Copied login key')
                          }}
                          text={form.getFieldValue('userId')}
                        >
                          <Button
                            icon={<CopyOutlined />}
                            style={{ width: '20%' }}
                            type="primary"
                          />
                        </CopyToClipboard>
                      </Input.Group>
                    </Form.Item>
                  </Col>
                </Row>
              </>
            )}

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
                        label={sharingInputFriendsNameLabel}
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
                disabled={!userNameServer}
                htmlType="submit"
                icon={<SendOutlined />}
                size="large"
                style={{ marginTop: '20px' }}
                type="primary"
              >
                {sharingButtonCreateLinks}
              </Button>
            </Form.Item>
          </Form>
        </Panel>
        <Panel
          extra={(isGeneratingToken || isLoading) && <LoadingOutlined />}
          header={sharingInviteTitle}
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
                sharingInviteWaitingMessage
              )}
            </>
          )}
        </Panel>
      </Collapse>
    </div>
  )
}
