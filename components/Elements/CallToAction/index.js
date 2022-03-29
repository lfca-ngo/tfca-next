import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'

const CallToAction = ({ block, ghost, size, slug, style, text, type, url }) => {
  const CtaButton = React.forwardRef(function renderButton() {
    return (
      <Button
        block={block}
        className={`cta-button`}
        ghost={ghost}
        size={size}
        style={style}
        type={type}
      >
        {text}
      </Button>
    )
  })
  return (
    <Link href={slug || url || ''} passHref>
      <CtaButton />
    </Link>
  )
}

export default CallToAction
