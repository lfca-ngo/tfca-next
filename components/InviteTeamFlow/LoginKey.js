import { CopyOutlined } from '@ant-design/icons'
import { Button, Input, message, Popover, Space } from 'antd'
import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'

import { useUser } from '../../hooks'

const BTN_WIDTH = 60

export const LoginKey = ({ goBack, goNext }) => {
  const [hasCopied, setHasCopied] = useState(false)
  const { isLoggedIn, userId } = useUser()
  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h1>Save your login key</h1>
          <p>
            Please copy your login key and store it in a safe place (e.g. your
            private Notes App). You will need it to claim your rewards or to
            relogin from a different device or browser.
          </p>
          <Input.Group compact>
            <Input
              disabled
              size="large"
              style={{ width: `calc(100% - ${BTN_WIDTH}px)` }}
              value={userId}
            />
            <CopyToClipboard
              onCopy={() => {
                setHasCopied(true)
                message.success('Copied login key')
              }}
              text={userId}
            >
              <Button
                icon={<CopyOutlined />}
                size="large"
                style={{ width: `${BTN_WIDTH}px` }}
                type="primary"
              />
            </CopyToClipboard>
          </Input.Group>
        </div>
      ) : (
        <div>Something went wrong</div>
      )}
      <div className="actions">
        <Space>
          <Popover
            content={!hasCopied ? 'Please copy your login key first' : null}
          >
            <Button
              disabled={!hasCopied}
              onClick={goNext}
              size="large"
              type="primary"
            >
              Continue
            </Button>
          </Popover>
          <Button onClick={goBack} size="large">
            Back
          </Button>
        </Space>
      </div>
    </div>
  )
}
