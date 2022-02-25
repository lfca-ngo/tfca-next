import { Button, Card } from 'antd'
import React from 'react'

import { Text, text } from '../../../utils/Text'

const ActionCard = ({ item, onNext }) => {
  return (
    <Card className="action-card" style={{ background: 'white' }}>
      <Card.Meta title={item.name} />
      <Button onClick={() => onNext(item)}>Details</Button>
    </Card>
  )
}

export default ActionCard
