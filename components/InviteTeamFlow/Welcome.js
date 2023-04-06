import { Button, Popover, Space } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import { useUser } from '../../hooks'

export const Welcome = ({ goNext }) => {
  const { asPath } = useRouter()
  const { isLoggedIn, logout, user, userId } = useUser()

  const forwardLink = asPath.replace('/invite-team', '/team')

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1>Already logged in</h1>
          <p>
            You are already logged in as{' '}
            <Popover content={userId}>
              <a>{user?.userName}</a>{' '}
            </Popover>
            of the team {user?.teamId}. If you would like to play with this
            account, go to the homepage. If you would like to create a new
            account, logout.
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
            Welcome to the <b>TFCA Teams Challenge of {user?.teamId}</b>! The
            challenge is simple: Our goal is to trigger as many impactful
            climate actions as possible. For every action that you complete and
            for every invite that you share, you will get points and climb up
            the leaderboard of your team. The team member with the most points
            wins the challenge!
          </p>

          <p>
            Follow these <b>4 simple steps</b> to get started.
          </p>

          <div className="actions">
            <Button
              disabled={isLoggedIn}
              onClick={goNext}
              size="large"
              type="primary"
            >
              Get started
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
