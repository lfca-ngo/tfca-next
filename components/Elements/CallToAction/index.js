import { Button } from 'antd'
import Link from 'next/link'
import React, { useState } from 'react'

import { LeavePage } from '../../ActionModules/helpers/LeavePage'
import { BasicModal } from '../BasicModal'

const CallToAction = ({
  block,
  ghost,
  onClick,
  size,
  slug,
  style,
  text,
  type,
  url,
}) => {
  const CtaButton = React.forwardRef(function renderButton() {
    return (
      <Button
        block={block}
        className={`cta-button`}
        ghost={ghost}
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
