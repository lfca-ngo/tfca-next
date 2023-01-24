import { DownOutlined } from '@ant-design/icons'
import { Avatar, Dropdown } from 'antd'
import classNames from 'classnames'
import React from 'react'

import { CustomLink } from './CustomLink'

const Title = ({ icon, slug, title, url }) => (
  <CustomLink slug={slug} url={url}>
    {icon && <span className="icon">{icon}</span>}
    <span className="title">{title}</span>
  </CustomLink>
)

export const MenuItem = ({
  className,
  icon,
  showCaret,
  slug,
  submenuItems,
  title,
  url,
}) => {
  return (
    <li className={classNames('menu-item', className)}>
      {submenuItems ? (
        <Dropdown
          overlay={
            <div className="submenu">{submenuItems.map((item) => item)}</div>
          }
        >
          <a onClick={(e) => e.preventDefault()}>
            <Title
              icon={
                showCaret ? (
                  <Avatar icon={<DownOutlined />} shape="square" />
                ) : (
                  icon
                )
              }
              slug={slug}
              title={title}
              url={url}
            />
          </a>
        </Dropdown>
      ) : (
        <Title icon={icon} slug={slug} title={title} url={url} />
      )}
    </li>
  )
}
