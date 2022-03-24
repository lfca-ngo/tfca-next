import { Button, Form } from 'antd'
import React, { useState } from 'react'

export const EmailReminder = ({ onClose }) => {
  const [loading, setLoading] = useState(false)
  // const { trackEvent } = useAnalytics()

  // TODO: Remove mock implemetation
  const onFinish = async () => {
    setLoading(true)
    const res = { status: 200 }
    setLoading(false)
    if (res?.status === 200) {
      onClose && onClose()
    } else {
      alert('Etwas ist schiefgelaufen. Bitte melde dich bei timo@lfca.earth')
    }
    setLoading(false)
  }

  return (
    <Form onFinish={onFinish}>
      {ITEMS.email()}
      <Button
        block
        htmlType="submit"
        loading={loading}
        size="large"
        type="primary"
      >
        Erinnerung einstellen
      </Button>
    </Form>
  )
}
