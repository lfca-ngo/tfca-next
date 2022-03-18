import { Select as AntdSelect } from 'antd'
import React from 'react'

import { MultiSelect } from './MultiSelect'
import { SelectWithOptionalInput } from './SelectWithOptionalInput'

export const Select = ({ filterMode, options, ...props }) => {
  const renderFilterType = () => {
    switch (filterMode) {
      case 'radio-single':
        return <MultiSelect items={options} singleMode={true} {...props} />
      case 'radio-multi':
        return <MultiSelect items={options} singleMode={false} {...props} />
      case 'select-with-optional-input':
        return <SelectWithOptionalInput items={options} {...props} />
      case 'select-single':
        return (
          <AntdSelect {...props}>
            {options.map((option) => (
              <AntdSelect.Option key={option.value} value={option.value}>
                {option.label}
              </AntdSelect.Option>
            ))}
          </AntdSelect>
        )
      case 'select-multi':
        return (
          <AntdSelect mode="multiple" {...props}>
            {options.map((option) => (
              <AntdSelect.Option key={option.value} value={option.value}>
                {option.label}
              </AntdSelect.Option>
            ))}
          </AntdSelect>
        )

      default:
        return null
    }
  }

  return renderFilterType()
}
