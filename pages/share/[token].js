/**
 * Use this token for testing:
 * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmllbmQxIjp7ImNoYWxsZW5nZSI6IkVuZXJneSIsIm5hbWUiOiJUaW1vIn0sImZyaWVuZDIiOnsiY2hhbGxlbmdlIjoiRW5lcmd5IiwibmFtZSI6IkFubmEifSwiZnJpZW5kMyI6eyJjaGFsbGVuZ2UiOiJFbmVyZ3kiLCJuYW1lIjoiU2FyYWgifSwic2VsZiI6eyJjaGFsbGVuZ2UiOiJFb2xpdGljcyIsIm5hbWUiOiJEYXZpZCJ9LCJpYXQiOjE2NDUwMTcyNjF9.bsqW3ZYhAs7qx3vc8l4czrqC2pQ1s93ObbsqdR47jZ0
 */

import { Card, Space, Tabs, Typography } from 'antd'
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
