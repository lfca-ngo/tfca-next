import { CopyOutlined, LoadingOutlined } from '@ant-design/icons'
import { Alert, Button, Col, Form, Input, Popover, Row, Space } from 'antd'
import React, { useEffect } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { useUser } from '../../hooks'
import { useCreateUniqueUserName } from '../../services/internal/username'

const BTN_WIDTH = 60

export const Username = ({ goNext }) => {
  const { isLoggedIn, login, user, userId } = useUser()
  const [form] = Form.useForm()

  const {
    data: userNameData,
    isLoading: isCreatingUserName,
    mutate: createUniqueUserName,
  } = useCreateUniqueUserName({
    onSuccess: () => login(userId),
  })

  const userName = userNameData?.data?.userName || user?.userName

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
    })
  }, [form, user, userName])

  return (
    <div>
      <div>
        <h1>Generate your username 🙋🏻‍♀️</h1>
        <p>
          {`In order to track your scores and see how you compare to your team
          mates, you need a unique username. This username will be displayed on
          your teams' leaderboard.`}
        </p>

        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col md={12} xs={24}>
              <Form.Item
                label={`What's your first name?`}
                name="senderFirstName"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input
                  addonAfter={isCreatingUserName ? <LoadingOutlined /> : null}
                  data-testid="success-own-name-input"
                  onBlur={validateUserName}
                  placeholder={'Greta'}
                  size="large"
                />
              </Form.Item>
            </Col>
            <Col md={12} xs={24}>
              <Form.Item label="Your username">
                <Popover
                  content={
                    'Your username will be auto generated based on your first name.'
                  }
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
                        size="large"
                        style={{ width: `calc(100% - ${BTN_WIDTH}px)` }}
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
                        size="large"
                        style={{ width: `${BTN_WIDTH}px` }}
                        type="primary"
                      />
                    </CopyToClipboard>
                  </Input.Group>
                </Popover>
              </Form.Item>
            </Col>
          </Row>
        </Form>

        {isLoggedIn && (
          <Alert
            message="Wonderful! Your username has been generated."
            showIcon
            style={{ margin: '0 0 30px' }}
            type="success"
          />
        )}

        <div className="actions">
          <Space>
            <Button onClick={goNext} size="large" type="primary">
              Continue
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
}
