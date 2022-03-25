import { Button, Input, message, Tabs } from 'antd'
import Image from 'next/image'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

const { TextArea } = Input
const { TabPane } = Tabs

const BTN_WIDTH = '120px'

export const Share = ({ invites }) => {
  const createInviteText = (actionId, names) => {
    let prefix = ''
    let namesString = 'you'

    if (names.length === 1) {
      prefix = `Hey ${names[0]}! `
    } else {
      namesString = `${names.slice(0, names.length - 1).join(', ')} and ${
        names[names.length - 1]
      }`
    }

    return `${prefix}I completed the ${actionId} challenge! I am nominating ${namesString} to do the same! It’s Earth Day, you can afford #5minForThePlanet`
  }

  return (
    <div>
      <h2>Ready! Invite your friends</h2>
      <Tabs>
        {invites.map(({ actionId, names, ogImageUrl, shortLink }, i) => {
          const tabName = names.length === 1 ? names[0] : 'All'

          return (
            <TabPane key={tabName} tab={tabName}>
              <TextArea rows={4} value={createInviteText(actionId, names)} />

              <Image
                alt={tabName}
                height={630}
                layout="intrinsic"
                src={ogImageUrl}
                style={{ borderRadius: '12px', margin: '20px 0' }}
                width={1200}
              />

              <Input.Group className="equal-height" compact>
                <Input
                  className="copy-input"
                  disabled
                  style={{ width: `calc(100% - ${BTN_WIDTH})` }}
                  value={shortLink}
                />
                <CopyToClipboard
                  onCopy={() => {
                    message.success('Copied value')
                  }}
                  text={shortLink}
                >
                  <Button block style={{ width: BTN_WIDTH }} type="primary">
                    Copy{' '}
                  </Button>
                </CopyToClipboard>
              </Input.Group>
            </TabPane>
          )
        })}
      </Tabs>
    </div>
  )
}
