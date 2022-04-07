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
import { useContentBlocks } from '../../../hooks'
import { namesArrayToString } from '../../../utils'
import { Text, text } from '../../../utils/Text'
import { CopyTextArea } from '../../Elements/CopyTextArea'
import { SuperText } from '../../Elements/SuperText'

const { TabPane } = Tabs

const BTN_WIDTH = '120px'

export const Share = ({ actionInviteText, invites }) => {
  const shareTitle = text(useContentBlocks('sharing.title'))
  const shareHint = useContentBlocks('sharing.hint')
  const shareTitleSup = text(useContentBlocks('sharing.title.sup'))
  const shareMessageBodyNominate = useContentBlocks(
    'sharing.message.body.nominate'
  )
  const shareMessageBodyGeneric = text(
    useContentBlocks('sharing.message.body.generic')
  )
  const shareMessageTitle = text(useContentBlocks('sharing.message.title'))

  return (
    <div className="share-dialog">
      <SuperText text={shareTitleSup} />
      <h2>{shareTitle}</h2>
      <Text block={shareHint} />
      <Tabs defaultActiveKey="0">
        {invites.map(({ names, ogImageUrl, shortLink }, i) => {
          const tabName = !names
            ? 'General'
            : names.length === 1
            ? names[0]
            : 'All'

          const shareMessageBody = names?.length
            ? text(shareMessageBodyNominate, {
                actionInviteText: actionInviteText
                  ? `${actionInviteText}! `
                  : '',
                name: namesArrayToString(names),
              })
            : shareMessageBodyGeneric

          return (
            <TabPane key={`${i}`} tab={tabName}>
              <CopyTextArea
                disabled
                rows={4}
                text={shareMessageBody}
                textSize="large"
              />

              <div className="share-image-preview">
                <Image
                  alt={tabName}
                  height={630}
                  layout="responsive"
                  objectFit="cover"
                  src={ogImageUrl}
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
                  title={shareMessageBody}
                  url={shortLink}
                >
                  <WhatsAppOutlined />
                  Share on WhatsApp
                </WhatsappShareButton>
                <FacebookShareButton
                  className="ant-btn ant-btn-primary share-btn"
                  quote={shareMessageBody}
                  resetButtonStyle={false}
                  url={shortLink}
                >
                  <FacebookOutlined />
                  Share on Facebook
                </FacebookShareButton>
                <TelegramShareButton
                  className="ant-btn ant-btn-primary share-btn"
                  resetButtonStyle={false}
                  title={shareMessageBody}
                  url={shortLink}
                >
                  <Icon component={TelegramIcon} />
                  Share on Telegram
                </TelegramShareButton>
                <TwitterShareButton
                  className="ant-btn ant-btn-primary share-btn"
                  resetButtonStyle={false}
                  title={shareMessageTitle}
                  url={shortLink}
                >
                  <TwitterOutlined /> Share on Twitter
                </TwitterShareButton>
                <LinkedinShareButton
                  className="ant-btn ant-btn-primary share-btn"
                  resetButtonStyle={false}
                  summary={shareMessageBody}
                  title={shareMessageTitle}
                  url={shortLink}
                >
                  <LinkedinOutlined /> Share on Linkedin
                </LinkedinShareButton>
                <EmailShareButton
                  body={shareMessageBody}
                  className="ant-btn ant-btn-primary share-btn"
                  resetButtonStyle={false}
                  subject={shareMessageTitle}
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
