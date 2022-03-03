import { Drawer } from 'antd'
import React from 'react'

import { useIsMobile } from '../../hooks/useIsClient'
import Disclosure from '.'

export const DisclosureDrawer = (props) => {
  const isMobile = useIsMobile()
  const { data, onClose, visible } = props

  return (
    <Drawer
      className={`drawer-md`}
      onClose={onClose}
      placement="right"
      visible={visible}
      width={isMobile ? '100%' : '700px'}
    >
      <Disclosure data={data} />
    </Drawer>
  )
}
