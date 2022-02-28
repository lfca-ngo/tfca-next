import { Button } from 'antd'
import Link from 'next/link'
import React from 'react'

const CallToAction = ({ block, ghost, size, slug, style, text, type, url }) => {
  // const svg = get(icon, 'svg.content')

  // const customIcon = svg ? (
  //   <div className="custom-icon" dangerouslySetInnerHTML={{ __html: svg }} />
  // ) : null
  console.log(text)
  const CtaButton = () => (
    <Button
      block={block}
      className={`cta-button`}
      ghost={ghost}
      size={size}
      style={style}
      type={type}
    >
      {text}
      {/* {customIcon} */}
    </Button>
  )
  return (
    <Link href={slug || url} passHref>
      <CtaButton />
    </Link>
  )
}

export default CallToAction
