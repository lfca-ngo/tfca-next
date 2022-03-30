require('./styles.less')

import { Button } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { LeavePage } from '../../ActionModules/helpers/LeavePage'
import { BasicModal } from '../BasicModal'

const CallToAction = ({
  block,
  ghost,
  icon,
  onClick,
  size,
  slug,
  style,
  text,
  type,
  url,
}) => {
  const CtaButton = React.forwardRef(function renderButton() {
    console.log('icon', icon)
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
  })
  // on click takes precedence over url
  if (onClick) return <CtaButton />
  return (
    <Link href={slug || url || ''} passHref>
      <CtaButton />
    </Link>
  )
}

const ConditionalModalWrapper = (props) => {
  const [visible, setVisible] = useState(false)
  if (props.showLeaveModal) {
    return (
      <>
        <CallToAction {...props} onClick={() => setVisible(true)} />
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
