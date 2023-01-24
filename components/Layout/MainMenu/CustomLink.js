import Link from 'next/link'
import React from 'react'

export const CustomLink = ({ children, slug, url }) => {
  const type = url ? 'url' : slug ? 'slug' : ''

  switch (type) {
    case 'url':
      return <a href={url}>{children}</a>
    case 'slug':
      return (
        <Link href={slug || ''} passHref>
          <a>{children}</a>
        </Link>
      )
    default:
      return <>{children}</>
  }
}
