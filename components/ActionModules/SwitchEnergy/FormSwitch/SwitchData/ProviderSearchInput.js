import { Select } from 'antd'
import debounce from 'lodash/debounce'
import React, { useRef, useState } from 'react'

import { useSearchProvider } from '../../../../../services/switchforclimate'
import { textBlockToString } from '../../../../../utils'

const { Option } = Select

export const ProviderSearchInput = ({ value = {}, onChange, blocks }) => {
  const [selectedProvider, setSelectedProvider] = useState({})
  const [searchText, setSearchText] = useState('')
  const { data: searchResult, isLoading } = useSearchProvider(searchText)

  const debouncedSearch = useRef(
    debounce((nextValue) => setSearchText(nextValue), 250)
  ).current

  const onSelect = (providerId) => {
    const provider = searchResult?.providers?.find((r) => r.id === providerId)

    const newSelectedProvider = {
      name: provider.name,
      pid: providerId,
    }
    setSelectedProvider(newSelectedProvider)
    onChange(newSelectedProvider)
  }

  return (
    <Select
      data-testid="switch-energy-form-switch-previous-priovider-search-input"
      defaultActiveFirstOption={false}
      filterOption={false}
      loading={isLoading}
      notFoundContent={null}
      onChange={onSelect}
      onSearch={debouncedSearch}
      placeholder={textBlockToString(
        blocks['switch.connect.prevprovider.search.placeholder']
      )}
      showSearch
      value={value.pid || selectedProvider.pid}
    >
      {searchResult?.providers?.map((o) => (
        <Option
          data-testid="switch-energy-form-switch-previous-priovider-option"
          key={o.id}
          value={o.id}
        >
          {o.name}
        </Option>
      ))}
    </Select>
  )
}
