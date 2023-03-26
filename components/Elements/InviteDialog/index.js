require('./styles.less')

import {
  CopyOutlined,
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
  Popover,
  Row,
} from 'antd'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import {
  useContentBlocks,
  useContentLists,
  useCustomization,
  useLogin,
  useUser,
} from '../../../hooks'
import { useCreateInvites } from '../../../services/internal/invites'
import { useCreateUniqueUserName } from '../../../services/internal/username'
import { useInvalidateUserScore } from '../../../services/internal/userscore'
import { textBlockToString } from '../../../utils'
import { CheckList, LoadingSpinner, SuperText } from '../../Elements'
import { Share } from './Share'

const { Panel } = Collapse

const CREATE = 'create'
const RESULTS = 'results'

const { useForm } = Form

const MAX_INVITES = 10
const NAMES = ['Carla', 'Yasmin', 'Kim']

export const InviteDialog = () => {
  const customization = useCustomization()
  const { isLoading, user, userId } = useUser()

  const benefits = useContentLists('sharing.benefits')?.items
  const [activeCollapseKey, setActiveCollapseKey] = useState(CREATE)
  const [form] = useForm()

  const { setLoginVisible } = useLogin()
  const { locale, query } = useRouter()
  const { actionCollectionSlug } = query
  const invalidateCache = useInvalidateUserScore()

  const {
    data: userNameData,
    isLoading: isCreatingUserName,
    mutate: createUniqueUserName,
  } = useCreateUniqueUserName({
    onSuccess: () => invalidateCache(userId),
  })

  const {
    data: invitesData,
    isLoading: isGeneratingToken,
    mutate: createInvites,
  } = useCreateInvites({
    onSuccess: () => invalidateCache(userId),
  })

  const invites = invitesData?.data || []
  const userName = userNameData?.data?.userName || user?.userName

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
    { team: user?.teamId?.toLocaleUpperCase() }
  )
  const panelTitle = textBlockToString(useContentBlocks('sharing.panel.title'))
  const sharingInputTeamLabel = textBlockToString(
    useContentBlocks('sharing.input.team.label')
  )
  const sharingInputTeamPlaceholder = textBlockToString(
    useContentBlocks('sharing.input.team.placeholder')
  )
  const sharingInputFriendsNameLabel = textBlockToString(
    useContentBlocks('sharing.input.friendsname.label')
  )
  const loginHint = textBlockToString(useContentBlocks('sharing.login.hint'))
  const userNameHint = textBlockToString(
    useContentBlocks('sharing.username.hint')
  )
  const senderFirstNameLabel = textBlockToString(
    useContentBlocks('sharing.input.senderfirstname.label')
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
  const socialTitle = textBlockToString(
    useContentBlocks('sharing.invite.title')
  )
  const socialTitleCustomBlock = useContentBlocks('sharing.invite.title.custom')

  // create multiple invite links
  // map of promises with infos
  const onCreateInvites = async (values) => {
    const senderFirstName = values.senderFirstName ?? undefined
    const senderUserName = values.senderUserName ?? undefined

    const payload = {
      actionCollectionSlug,
      invites: values.names.map((name) => ({
        invitedUserName: name,
        socialTitle: textBlockToString(socialTitleCustomBlock, { name: name }),
      })),
      locale,
      referredByTeamId: customization?.referredByTeamId || null, // this is the team that the inviting user was invited by, can be null
      referredByUserId: customization?.referredByUserId || null, // this is the uid of the user that invited the inviting user, can be null
      senderFirstName: senderFirstName,
      senderUserName: senderUserName,
      socialDescription: socialDescription,
      socialTitle: socialTitle,
      teamId: user?.teamId, // this is the teamId of the inviting user
      userId: userId, // this is the uid of the inviting user
    }

    createInvites(payload)
    setActiveCollapseKey(RESULTS)
  }

  const validateUserName = () => {
    if (form.isFieldTouched('senderFirstName') && user?.teamId) {
      createUniqueUserName({
        firstName: form.getFieldValue('senderFirstName'),
        teamId: user?.teamId,
        userId: userId,
      })
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      senderFirstName: user?.firstName,
      senderUserName: userName,
      team: user?.teamId?.toLocaleUpperCase(),
      userId: userId,
    })
  }, [form, user, userName, userId])

  return (
    <div className="invite-dialog">
      <SuperText text={mainSupertext} />
      <h2>{mainTitle}</h2>
      <p>
        {user?.teamId ? mainTeamBody : null}
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
            onFinish={onCreateInvites}
          >
            {user?.teamId && (
              <Form.Item label={sharingInputTeamLabel} name="team">
                <Input disabled placeholder={sharingInputTeamPlaceholder} />
              </Form.Item>
            )}

            <Form.Item
              label={senderFirstNameLabel}
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
                placeholder={'Greta'}
              />
            </Form.Item>

            {user?.teamId && (
              <>
                <p>
                  {loginHint} <a onClick={() => setLoginVisible(true)}>Login</a>
                </p>

                <Row gutter={16}>
                  <Col md={12} xs={24}>
                    <Form.Item label="User name">
                      <Popover
                        content={userNameHint}
                        overlayClassName="popover-md"
                      >
                        <Input.Group compact>
                          <Form.Item
                            name="senderUserName"
                            noStyle
                            rules={[
                              {
                                required: user?.teamId,
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
                              icon={
                                isCreatingUserName ? (
                                  <LoadingOutlined />
                                ) : (
                                  <CopyOutlined />
                                )
                              }
                              style={{ width: '20%' }}
                              type="primary"
                            />
                          </CopyToClipboard>
                        </Input.Group>
                      </Popover>
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
                              required: user?.teamId,
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
