require('./styles.less')

import { Button } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { useAnalytics } from '../../../hooks'
import { BEFORE_LEAVE_PAGE } from '../../../services/analytics'
import { getMailToLink } from '../../../utils'
import { LeavePage } from '../../ActionModules/helpers/LeavePage'
import { BasicModal } from '../BasicModal'

const DEFAULT_RECIPIENT = 'someone@mail.org'

const CallToAction = (props) => {
  const onClickType = props.onClick && 'click'
  const type = onClickType || props.action || 'link'

  switch (type) {
    case 'click':
      return <CtaButton {...props} />
    case 'open-email':
      return (
        <a
          href={getMailToLink({
            body: props.emailTemplate.text,
            subject: props.emailTemplate.subject,
            to: DEFAULT_RECIPIENT,
          })}
        >
          <CtaButton {...props} />{' '}
        </a>
      )
    default:
      return (
        <Link href={props.slug || props.url || ''} passHref>
          <CtaButton {...props} />
        </Link>
      )
  }
}

const CtaButton = ({
  block,
  ghost,
  icon,
  onClick,
  size,
  style,
  text,
  type,
}) => {
  return (
    <Button
      block={block}
      className={`cta-button`}
      ghost={ghost}
      icon={
        icon ? (
          <Image
            height={24}
            layout="fixed"
            src={icon?.url}
            style={{ marginRight: '8px' }}
            width={24}
          />
        ) : null
      }
      onClick={onClick}
      size={size}
      style={style}
      type={type}
    >
      {text}
    </Button>
  )
}

const ConditionalModalWrapper = (props) => {
  const [visible, setVisible] = useState(false)
  const { trackEvent } = useAnalytics()

  const openModal = () => {
    setVisible(true)
    trackEvent({
      name: BEFORE_LEAVE_PAGE,
      values: {
        action_id: props.actionId,
        destination_text: props.text,
        destination_url: props.url,
      },
    })
  }

  if (props.showLeaveModal && props.action !== 'open-email') {
    return (
      <>
        <CallToAction {...props} onClick={openModal} />
        <BasicModal
          content={
            <LeavePage
              destination={props.text}
              destinationUrl={props.url}
              onNext={props.onCountMeIn}
            />
          }
          setVisible={setVisible}
          title={null}
          visible={visible}
        />
      </>
    )
  } else return <CallToAction {...props} />
}

export default ConditionalModalWrapper
