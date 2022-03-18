require('./styles.less')

import { Select as AntdSelect } from 'antd'
import Image from 'next/image'
import React from 'react'

export const Select = ({ items = [], mode, ...props }) => {
  return (
    <AntdSelect
      className="select-filter-select"
      mode={mode}
      {...props}
      getPopupContainer={() => document.getElementById('scroll-container')}
    >
      {items.map((option) => (
        <AntdSelect key={option.value} value={option.value}>
          <AntdSelect.Option>
            <span className="label-wrapper">
              {option.iconUrl && (
                <span className="icon">
                  <Image height={25} src={option.iconUrl} width={25} />
                </span>
              )}
              {option.label}
            </span>
          </AntdSelect.Option>
        </AntdSelect>
      ))}
    </AntdSelect>
  )
}
