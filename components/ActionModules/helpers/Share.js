import { Button, Input, message, Tabs } from 'antd'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const { TextArea } = Input
const { TabPane } = Tabs

const BTN_WIDTH = '120px'
const INVITE_TEXT = `My home is running on 100% renewables! I am nominating Tim, Christian and Boris for the energy challenge! It’s Earth Day, you 
can afford  #5minForThePlanet`

export const Share = (props) => {
  const { invites } = props

  return (
    <div>
      <h2>Ready! Invite your friends</h2>
      <Tabs defaultActiveKey="1">
        {invites.map((invite, i) => (
          <TabPane key={`${i}`} tab={invite.name}>
            <TextArea rows={4} value={INVITE_TEXT} />

            <img
              alt={invite.name}
              src={invite.ogImageUrl}
              style={{ margin: '20px 0', borderRadius: '12px' }}
            />

            <Input.Group compact>
              <Input
                className="copy-input"
                disabled
                style={{ width: `calc(100% - ${BTN_WIDTH})` }}
                value={invite.shortLink}
              />
              <CopyToClipboard
                onCopy={() => {
                  message.success('Copied value')
                }}
                text={invite.shortLink}
              >
                <Button block style={{ width: BTN_WIDTH }} type="primary">
                  Copy{' '}
                </Button>
              </CopyToClipboard>
            </Input.Group>
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}
