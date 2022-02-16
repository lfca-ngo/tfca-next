import { Button, Card, Input, Select, Space, Typography } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'

const { Option } = Select
const { Text, Title } = Typography

export default function Home() {
  const [self, setSelf] = React.useState({
    challenge: 'Energy',
    name: '',
  })

  const [friend1, setFriend1] = React.useState({
    challenge: 'Energy',
    name: '',
  })
  const [friend2, setFriend2] = React.useState({
    challenge: 'Energy',
    name: '',
  })
  const [friend3, setFriend3] = React.useState({
    challenge: 'Energy',
    name: '',
  })

  const router = useRouter()

  return (
    <Card style={{ width: 300 }}>
      <Space direction="vertical">
        <Text>
          FOR TESTING: Enter your name and the challenge you completed.
        </Text>
        <NominateNameInput onChange={setSelf} value={self} />
        <Title level={2}>
          {`Awesome ${self.name}! Now nominate up to 3 friends to follow in your
          footsteps`}
        </Title>
        <Text>
          You can invite friends individually e.g. via WhatsApp or collectivly
          in a news feed!
        </Text>
        <NominateNameInput onChange={setFriend1} value={friend1} />
        <NominateNameInput onChange={setFriend2} value={friend2} />
        <NominateNameInput onChange={setFriend3} value={friend3} />

        <Button onClick={generateUrlAndRedirect} type="primary">
          Share challenge
        </Button>
      </Space>
    </Card>
  )

  async function generateUrlAndRedirect() {
    const payload = {
      friend1,
      friend2,
      friend3,
      self,
    }

    const response = await fetch('/api/create-share-token', {
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const { token } = await response.json()

    router.push(`/share/${token}`)
  }
}

function NominateNameInput({ onChange, value }) {
  return (
    <Input
      addonAfter={
        <Select
          onChange={(challenge) => onChange({ ...value, challenge })}
          style={{ width: 100 }}
          value={value.challenge}
        >
          <Option value="Energy">Energy</Option>
          <Option value="Politics">Politics</Option>
          <Option value="Banking">Banking</Option>
        </Select>
      }
      onChange={(e) => onChange({ ...value, name: e.target.value })}
      value={value.name}
    />
  )
}
