import React from 'react'

import ActionWrapper from './ActionWrapper'
import AtWork from './AtWork'
import SwitchEnergy from './SwitchEnergy'

const ActionModules = (props) => {
  if (!props.actions) return null

  const renderAction = (action) => {
    switch (action.actionId) {
      case 'switch_energy':
        return <SwitchEnergy key={action.actionId} module={action} />
      case 'at_work':
        return <AtWork key={action.actionId} module={action} />
      default:
        return <div />
    }
  }

  return props.actions.map((action, i) => (
    <ActionWrapper
      carbonSaved={action.carbonSaved}
      color={`color-${(i % 4) + 1}`}
      key={action.actionId}
      name={action.actionId}
      otherUsers={0}
      timeToImplement={action.timeToImplement}
    >
      {renderAction(action, i)}
    </ActionWrapper>
  ))
}

export default ActionModules
