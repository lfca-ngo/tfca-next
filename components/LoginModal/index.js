import { Button, Form, Input, message, Modal } from 'antd'
import React from 'react'

import { SERVER_UID, useLogin, useUser } from '../../hooks'
import { setCookie, UID_COOKIE_NAME } from '../../utils'

export const LoginModal = () => {
  const { loginVisible, setLoginVisible } = useLogin()
  const { isLoading, refetchUserScore } = useUser()

  // handle login
  const handleLogin = async ({ userId: newUserId }) => {
    setCookie(UID_COOKIE_NAME, newUserId)
    setCookie(SERVER_UID, newUserId)

    // refetch user score to update the user id
    await refetchUserScore()

    message.success('Logged in')
    setLoginVisible(false)
  }

  return (
    <Modal
      footer={null}
      onCancel={() => setLoginVisible(false)}
      visible={loginVisible}
    >
      <h5>Login</h5>
      <p>
        {`To login, copy your login key from the User Menu and paste it here. We
      don't store any personal data, your key is the only way to play from
      another device.`}
      </p>
      <Form layout="vertical" onFinish={handleLogin}>
        <Form.Item label="Login Key" name="userId">
          <Input placeholder="abcd-abcd-abcd-abcd" />
        </Form.Item>
        <Form.Item>
          <Button block htmlType="submit" loading={isLoading} type="primary">
            Login
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
