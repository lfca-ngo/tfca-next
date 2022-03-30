import { Drawer } from 'antd'
import React from 'react'

import Disclosure from '.'

export const DisclosureDrawer = (props) => {
  const { data, onClose, visible } = props

  return (
    <Drawer
      className={`drawer-md`}
      onClose={onClose}
      placement="right"
      visible={visible}
    >
      <Disclosure data={data} />
    </Drawer>
  )
}
