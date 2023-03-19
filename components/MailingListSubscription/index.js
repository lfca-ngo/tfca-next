require('./styles.less')

import { Button, Checkbox, Col, Form, Input, message, Row } from 'antd'
import React from 'react'

import { useSubscribeUserToMailingList } from '../../services/internal/mailchimp'
import { DownloadKit } from './DownloadKit'

export const MailingListSubscription = () => {
  const {
    isLoading,
    isSuccess,
    mutate: subscribeToMail,
  } = useSubscribeUserToMailingList()

  const handleFinish = (values) => {
    subscribeToMail(values, {
      onError: (error) => {
        const parsedError = JSON.parse(error.request.response)
        const errorMessage = parsedError?.message ?? 'Something went wrong!'
        message.error(errorMessage)
      },
      onSuccess: () => message.success('Successfully subscribed!'),
    })
  }

  return (
    <div className="mailing-list-subscription">
      <div className="container">
        <Row justify="center">
          <Col lg={14} md={20} xs={24}>
            <h2>Download the social media kit</h2>{' '}
            <p>
              Share the campaign with your network and help us reach our goal of
              100M people taking climate action.
            </p>
            {isSuccess ? (
              <DownloadKit />
            ) : (
              <>
                <Form layout="vertical" onFinish={handleFinish}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { message: 'Please input your email!', required: true },
                    ]}
                  >
                    <Input placeholder="you@org.earth" />
                  </Form.Item>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        message: 'Please input your first name!',
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Nelson" />
                  </Form.Item>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      {
                        message: 'Please input your last name!',
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Thun" />
                  </Form.Item>
                  <Form.Item
                    label="Company Name"
                    name="companyName"
                    rules={[
                      {
                        message: 'Please input your company name!',
                        required: true,
                      },
                    ]}
                  >
                    <Input placeholder="Earth" />
                  </Form.Item>
                  <Form.Item
                    name="agreement"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject('Please agree to receive emails!'),
                      },
                    ]}
                    valuePropName="checked"
                  >
                    <Checkbox>
                      I agree to receive emails from{' '}
                      <a
                        href="https://lfca.earth"
                        rel="noreferrer"
                        target="_blank"
                      >
                        lfca.earth
                      </a>{' '}
                      and understand that I can unsubscribe at any time.
                    </Checkbox>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      block
                      htmlType="submit"
                      loading={isLoading}
                      type="primary"
                    >
                      Get the social media kit
                    </Button>
                  </Form.Item>
                </Form>
              </>
            )}
          </Col>
        </Row>
      </div>
    </div>
  )
}
