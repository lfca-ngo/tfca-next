import React from 'react'

import StickyHeader from '../StickyHeader'

const SplitLayout = ({ children }) => {
  return (
    <div>
      <StickyHeader />
      {children}
    </div>
  )
}

export default SplitLayout
