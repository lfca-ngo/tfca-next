require('./share.less')

import Icon from '@ant-design/icons'
import {
  FacebookOutlined,
  LinkedinOutlined,
  MailOutlined,
  TwitterOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons'
import { Button, Input, message, Space, Tabs } from 'antd'
import Image from 'next/image'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'

import TelegramIcon from '../../../assets/icons/telegram.svg'
import { namesArrayToString } from '../../../utils'
import { CopyTextArea } from '../../Elements/CopyTextArea'
import { SuperText } from '../../Elements/SuperText'

const { TabPane } = Tabs

const BTN_WIDTH = '120px'

export const Share = ({ imageInviteText, invites }) => {
  const createInviteText = (names) => {
    let prefix = ''
    let namesString = 'you'

    if (names.length === 1) {
      prefix = `Hey ${names[0]}! `
    } else {
      namesString = namesArrayToString(names)
    }

    // TODO: Get text from contentful
    return `${prefix}${imageInviteText}! I am nominating ${namesString} to do the same! It’s Earth Day, you can afford #5minForThePlanet`
  }

  return (
    <div className="share-dialog">
      <SuperText text="Share the challenge" />
      <h2>Ready! Invite your friends</h2>
      <Tabs defaultActiveKey="0">
        {invites.map(({ names, ogImageUrl, shortLink }, i) => {
          const tabName = names.length === 1 ? names[0] : 'All'
          const inviteText = createInviteText(names)
          const inviteTitle = `It's time to take climate action`
          return (
            <TabPane key={`${i}`} tab={tabName}>
              <CopyTextArea rows={4} text={inviteText} textSize="large" />

              <div className="share-image-preview">
                <Image
                  alt={tabName}
                  height={630}
                  layout="intrinsic"
                  src={ogImageUrl}
                  style={{ borderRadius: '12px', margin: '20px 0' }}
                  unoptimized={true}
                  width={1200}
                />
              </div>

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

              <Space
                className="share-buttons"
                direction="vertical"
                style={{ width: '100%' }}
              >
                <WhatsappShareButton
                  className="ant-btn ant-btn-primary share-btn"
                  resetButtonStyle={false}
                  title={inviteText}
                  url={shortLink}
                >
                  <WhatsAppOutlined />
                  Share on WhatsApp
                </WhatsappShareButton>
                <FacebookShareButton
                  className="ant-btn ant-btn-primary share-btn"
                  quote={inviteText}
                  resetButtonStyle={false}
                  url={shortLink}
                >
                  <FacebookOutlined />
                  Share on Facebook
                </FacebookShareButton>
                <TelegramShareButton
                  className="ant-btn ant-btn-primary share-btn"
                  resetButtonStyle={false}
                  title={inviteText}
                  url={shortLink}
                >
                  <Icon component={TelegramIcon} />
                  Share on Telegram
                </TelegramShareButton>
                <TwitterShareButton
                  className="ant-btn ant-btn-primary share-btn"
                  resetButtonStyle={false}
                  url={shortLink}
                >
                  <TwitterOutlined /> Share on Twitter
                </TwitterShareButton>
                <LinkedinShareButton
                  className="ant-btn ant-btn-primary share-btn"
                  resetButtonStyle={false}
                  summary={inviteText}
                  title={inviteTitle}
                  url={shortLink}
                >
                  <LinkedinOutlined /> Share on Linkedin
                </LinkedinShareButton>
                <EmailShareButton
                  body={inviteText}
                  className="ant-btn ant-btn-primary share-btn"
                  resetButtonStyle={false}
                  subject={inviteTitle}
                  url={shortLink}
                >
                  <MailOutlined /> Share via Email
                </EmailShareButton>
              </Space>
            </TabPane>
          )
        })}
      </Tabs>
    </div>
  )
}
