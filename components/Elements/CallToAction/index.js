import { Button } from 'antd'
import React from 'react'

import { CustomLink } from '../CustomLink'

const CallToAction = ({ block, ghost, slug, style, text, type, url }) => {
  // const svg = get(icon, 'svg.content')

  // const customIcon = svg ? (
  //   <div className="custom-icon" dangerouslySetInnerHTML={{ __html: svg }} />
  // ) : null

  const CtaButton = () => (
    <Button
      block={block || null}
      className={`cta-button`}
      ghost={ghost}
      size={size || 'large'}
      style={style}
      type={type}
    >
      {text}
      {/* {customIcon} */}
    </Button>
  )
  return (
    <CustomLink slug={slug} url={url}>
      <CtaButton />
    </CustomLink>
  )
}

export default CallToAction
