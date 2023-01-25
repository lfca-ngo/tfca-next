import { CloseOutlined } from '@ant-design/icons'
import { Button, Drawer, Popover } from 'antd'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { useContentBlocks } from '../../../hooks'
import { textBlockToString } from '../../../utils'
import { Disclosure } from '../../Disclosure'

const PopoverContent = ({ company, onClose }) => {
  return (
    <div className="popover-content">
      <div className="content">
        <div className="logo">
          <div className="logo-wrapper">
            <Image layout="fill" objectFit="contain" src={company?.logoUrl} />
          </div>
        </div>
        <div className="text">
          {textBlockToString(useContentBlocks('menu.company.popover'), {
            name: company?.name,
          })}
        </div>
      </div>
      <Button
        className="no-padding"
        icon={<CloseOutlined />}
        onClick={onClose}
        type="link"
      />
    </div>
  )
}

export const CompanyMenuItem = ({ company, key }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)

  // We need to set this to open with a useEffect in orde to keep the server and client HTML in sync
  // See: https://github.com/vercel/next.js/discussions/17443#discussioncomment-87097
  useEffect(() => {
    setPopoverOpen(true)
  }, [])

  return (
    <li key={key}>
      <Popover
        content={
          <PopoverContent
            company={company}
            onClose={() => setPopoverOpen(false)}
          />
        }
        overlayClassName="popover-md hidden md-max"
        visible={popoverOpen}
        zIndex={10}
      >
        <span onClick={() => setIsOpen(true)}>{company?.name}</span>
      </Popover>
      <Drawer
        className="drawer-md"
        onClose={() => setIsOpen(!isOpen)}
        visible={isOpen}
      >
        <Disclosure data={company} />
      </Drawer>
    </li>
  )
}
