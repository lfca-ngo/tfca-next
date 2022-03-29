require('./styles.less')

import { Button } from 'antd'
import React from 'react'

export const FetchError = ({
  message = 'Something went wrong...',
  onRefetch,
  refetchLabel = 'Try again',
}) => {
  return (
    <div className="fetch-error">
      {/* TODO: localized message? */}
      <h3>{message}</h3>
      {onRefetch && <Button onClick={onRefetch}>{refetchLabel}</Button>}
    </div>
  )
}
