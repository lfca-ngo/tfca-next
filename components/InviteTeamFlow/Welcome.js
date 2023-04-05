import { Button } from 'antd'
import React from 'react'

import { useUser } from '../../hooks'

export const Welcome = ({ goNext }) => {
  const { isLoggedIn, user } = useUser()

  console.log('isLoggedIn', user)

  return (
    <div>
      {isLoggedIn ? (
        <>
          <h1>Already logged in</h1>
          <p>
            You are already logged in as {user?.userName}. If you would like to
            play, click here. If you would like to create a new account, logout.
          </p>
          <Button>Logout</Button>
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
        </>
      )}
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
    </div>
  )
}
