import { Input, Select } from 'antd'
import React from 'react'

const { Option } = Select

export const NominateNameInput = ({
  onChange,
  onFocus,
  placeholder,
  value = {},
}) => {
  const [name, setName] = React.useState('')
  const [challenge, setChallenge] = React.useState('Energy')

  return (
    <Input
      addonAfter={
        <Select
          onChange={onChallengeChange}
          style={{ width: 120 }}
          value={value.challenge || challenge}
        >
          <Option value="Energy">Energy</Option>
          <Option value="Politics">Politics</Option>
          <Option value="Banking">Banking</Option>
        </Select>
      }
      onChange={onNameChange}
      onFocus={onFocus}
      placeholder={placeholder}
      style={{ width: '100%' }}
      value={value.name || name}
    />
  )

  function onNameChange(e) {
    const newName = e.target.value

    if (!('name' in value)) {
      setName(newName)
    }

    triggerChange({
      name: newName,
    })
  }

  function onChallengeChange(newChallenge) {
    if (!('challenge' in value)) {
      setChallenge(newChallenge)
    }

    triggerChange({
      challenge: newChallenge,
    })
  }

  function triggerChange(changedValue) {
    onChange?.({
      challenge,
      name,
      ...value,
      ...changedValue,
    })
  }
}
