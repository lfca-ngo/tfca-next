import React from 'react'

import { DropdownSelect } from './DropdownSelect'
import { Radio } from './Radio'
import { Select } from './Select'
import { SelectWithOptionalInput } from './SelectWithOptionalInput'

export const SelectFilter = ({ filterMode, options, ...props }) => {
  const renderFilterType = () => {
    switch (filterMode) {
      case 'radio-single':
        return <Radio items={options} singleMode={true} {...props} />
      case 'radio-multi':
        return <Radio items={options} singleMode={false} {...props} />
      case 'select-with-optional-input':
        return <SelectWithOptionalInput items={options} {...props} />
      case 'select-single':
        return <Select items={options} {...props} />
      case 'select-multi':
        return <DropdownSelect items={options} {...props} />
      // return <Select items={options} mode="multiple" {...props} />

      default:
        return null
    }
  }

  return renderFilterType()
}
