import { Button, Card, Space, Tabs, Typography } from 'antd'
import jwt from 'jsonwebtoken'
import Image from 'next/image'
import React from 'react'

const { Text, Title } = Typography

const { TabPane } = Tabs

export default function Share({ friend1, friend2, friend3, self, token }) {
  return (
    <Card style={{ width: 400 }}>
      <Space direction="vertical">
        <Title level={2}>Ready! Invite your friends</Title>

        <Tabs defaultActiveKey="1" style={{ width: 300 }}>
          <TabPane key="1" tab="Multi-Invite">
            <Text>
              My home is running on <Text strong>100%</Text> renewables! I am
              nominating{' '}
              {`${friend1.name}, ${friend2.name} and ${friend3.name}`} for the{' '}
              {`${friend1.challenge}`}! (!!! which challenge for multi-invite?)
              It&apos;s Earth Day, you can afford #5minForThePlanet
            </Text>
            <Image
              alt="TFCA share"
              height={166}
              src={`/api/images/${token}`}
              width={300}
            />
          </TabPane>

          <TabPane key="2" tab={friend1.name}>
            TBD.
          </TabPane>
          <TabPane key="3" tab={friend2.name}>
            TBD.
          </TabPane>
          <TabPane key="4" tab={friend3.name}>
            TBD.
          </TabPane>
        </Tabs>
        <Button
          onClick={() => {
            window.open(`/de/deu/${token}`, '_blank')
          }}
        >
          Open shareable link
        </Button>
      </Space>
    </Card>
  )
}

export async function getStaticProps({ params }) {
  try {
    const token = params.token
    const parsedToken = jwt.verify(token, process.env.JWT_TOKEN_PRIVATE_KEY)
    return {
      props: {
        ...parsedToken,
        token,
      },
    }
  } catch (e) {
    return {
      notFound: true,
    }
  }
}

export async function getStaticPaths() {
  return { fallback: 'blocking', paths: [] }
}
