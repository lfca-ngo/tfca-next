import { Button, Space } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import { useUser } from '../../hooks'

export const Welcome = ({ goNext }) => {
  const { asPath } = useRouter()
  const { isLoggedIn, logout, user } = useUser()

  const forwardLink = asPath.replace('/invite-team', '/team')

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1>Already logged in</h1>
          <p>
            You are already logged in as {user?.userName} of the team{' '}
            {user?.teamId}. If you would like to play with this account, go to
            the homepage. If you would like to create a new account, logout.
          </p>
          <div className="actions">
            <Space>
              <Link href={forwardLink} passHref>
                <Button size="large" type="primary">
                  Go to Homepage
                </Button>
              </Link>

              <Button onClick={logout} size="large">
                Logout
              </Button>
            </Space>
          </div>
        </>
      ) : (
        <>
          <h1>Hi there 👋</h1>
          <p>
            Welcome to the TFCA Teams Challenge of {user?.teamId}. Your goal as
            part of the Challenge is to complete actions on our campaign page
            and invite friends and family to do the same.
          </p>
          <p>Please follow these 4 simple steps to get started!</p>
          <div className="actions">
            <Button
              disabled={isLoggedIn}
              onClick={goNext}
              size="large"
              type="primary"
            >
              Continue
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
