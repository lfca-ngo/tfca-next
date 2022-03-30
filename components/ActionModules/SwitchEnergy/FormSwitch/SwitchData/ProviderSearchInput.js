import { Select } from 'antd'
import debounce from 'lodash/debounce'
import React, { useRef, useState } from 'react'

import { useSearchProvider } from '../../../../../services/switchforclimate'

const { Option } = Select

export const ProviderSearchInput = ({ value = {}, onChange }) => {
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
      defaultActiveFirstOption={false}
      filterOption={false}
      loading={isLoading}
      notFoundContent={null}
      onChange={onSelect}
      onSearch={debouncedSearch}
      placeholder="Wähle einen Versorger"
      showSearch
      value={value.pid || selectedProvider.pid}
    >
      {searchResult?.providers?.map((o) => (
        <Option key={o.id} value={o.id}>
          {o.name}
        </Option>
      ))}
    </Select>
  )
}
