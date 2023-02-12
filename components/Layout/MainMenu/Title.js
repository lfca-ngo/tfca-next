import React from 'react'

import { CustomLink } from './CustomLink'

export const Title = ({ icon, slug, title, url }) => (
  <CustomLink slug={slug} url={url}>
    {icon && <span className="icon">{icon}</span>}
    <span className="title">{title}</span>
  </CustomLink>
)
