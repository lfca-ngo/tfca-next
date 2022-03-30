require('./styles.less')

import {
  FacebookOutlined,
  HomeOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from '@ant-design/icons'
import React from 'react'

const MAP = {
  facebook: <FacebookOutlined />,
  instagram: <InstagramOutlined />,
  twitter: <TwitterOutlined />,
  website: <HomeOutlined />,
}

export const SocialIcons = ({ items }) => {
  return (
    <div className="social-icons">
      {items
        .filter((s) => s?.url)
        .map((social) => {
          return (
            <div className="social-icon" key={social.id}>
              <a href={social.url} rel="noreferrer" target="_blank">
                {MAP[social.id]}
              </a>
            </div>
          )
        })}
    </div>
  )
}
