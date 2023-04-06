require('./styles.less')

import { Steps } from 'antd'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

import { LoginKey } from './LoginKey'
import { Start } from './Start'
import { Username } from './Username'
import { Welcome } from './Welcome'

export const InviteTeamFlow = () => {
  const { asPath, push } = useRouter()
  const [step, setStep] = useState(0)

  const forwardLink = asPath.replace('/invite-team', '/team')

  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handlePreviousStep = () => {
    setStep(step - 1)
  }

  const steps = [
    {
      content: <Welcome goBack={handlePreviousStep} goNext={handleNextStep} />,
      title: 'Welcome',
    },
    {
      content: <Username goBack={handlePreviousStep} goNext={handleNextStep} />,
      title: 'Username',
    },
    {
      content: <LoginKey goBack={handlePreviousStep} goNext={handleNextStep} />,
      title: 'Login Key',
    },
    {
      content: (
        <Start goBack={handlePreviousStep} goNext={() => push(forwardLink)} />
      ),
      title: `Let's go`,
    },
  ]

  return (
    <div className="steps-flow">
      <div className="container">
        <Steps current={step}>
          {steps.map((item) => (
            <Steps.Step key={item.title} title={item.title} />
          ))}
        </Steps>

        <div className="steps-content">{steps[step].content}</div>
      </div>
    </div>
  )
}
