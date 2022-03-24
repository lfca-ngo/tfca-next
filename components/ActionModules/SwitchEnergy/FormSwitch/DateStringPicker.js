import { DatePicker } from 'antd'
import moment from 'moment'
import React from 'react'

const FORMAT = 'DD.MM.YYYY'

export const DateStringPicker = ({ onChange, value, ...props }) => {
  return (
    <DatePicker
      format={FORMAT}
      onChange={(date) => {
        onChange(date.toISOString())
      }}
      value={value ? moment(value) : undefined}
      {...props}
    />
  )
}
