import { Col, Input, Row, Select } from 'antd'
import React from 'react'

const { Option } = Select
const SELECT_WIDTH = '140px'

export const NominateNameInput = ({
  onChange,
  onFocus,
  placeholder,
  value = {},
}) => {
  const [name, setName] = React.useState('')
  const [challenge, setChallenge] = React.useState('Energy')

  return (
    <Input.Group compact>
      <Input
        onChange={onNameChange}
        onFocus={onFocus}
        placeholder={placeholder}
        style={{ width: `calc(100% - ${SELECT_WIDTH})` }}
        value={'name' in value ? value.name : name}
      />
      <Select
        onChange={onChallengeChange}
        style={{ width: SELECT_WIDTH }}
        value={value.challenge || challenge}
      >
        <Option value="Energy">Energy</Option>
        <Option value="Politics">Politics</Option>
        <Option value="Banking">Banking</Option>
      </Select>
    </Input.Group>
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
