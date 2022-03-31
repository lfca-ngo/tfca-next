require('./styles.less')

import {
  FacebookOutlined,
  HomeOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

const MAP = {
  Facebook: <FacebookOutlined />,
  Instagram: <InstagramOutlined />,
  Twitter: <TwitterOutlined />,
  Web: <HomeOutlined />,
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
                <Button icon={MAP[social.id]}>{social.id}</Button>
              </a>
            </div>
          )
        })}
    </div>
  )
}
