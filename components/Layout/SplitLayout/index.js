import React from 'react'

import Template from '../'
import StickyHeader from '../StickyHeader'

const SplitLayout = ({ children }) => {
  return (
    <Template>
      <StickyHeader />
      {children}
    </Template>
  )
}

export default SplitLayout
