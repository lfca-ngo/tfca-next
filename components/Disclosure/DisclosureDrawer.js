import { Drawer } from 'antd'
import React from 'react'

import { useIsMobile } from '../../hooks'
import { MODAL_WIDTH_MD } from '../../utils'
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
      width={isMobile ? '100%' : MODAL_WIDTH_MD}
    >
      <Disclosure data={data} />
    </Drawer>
  )
}
