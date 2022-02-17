import React from 'react'

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <div>I am normal Header - but what is normal?</div>
      {children}
    </div>
  )
}

export default DefaultLayout
