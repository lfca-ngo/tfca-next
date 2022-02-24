import React from 'react'

import ActionWrapper from './ActionWrapper'
import Activism from './Activism'
import AtWork from './AtWork'
import Banking from './Banking'
import Politics from './Politics'
import SwitchEnergy from './SwitchEnergy'

const ActionModules = (props) => {
  if (!props.actions) return null

  const renderAction = (action) => {
    switch (action.actionId) {
      case 'switch_energy':
        return <SwitchEnergy key={action.actionId} module={action} />
      case 'at_work':
        return <AtWork key={action.actionId} module={action} />
      case 'banking':
        return <Banking key={action.actionId} module={action} />
      case 'activism':
        return <Activism key={action.actionId} module={action} />
      case 'politics':
        return <Politics key={action.actionId} module={action} />
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
