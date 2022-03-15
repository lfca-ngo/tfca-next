import React from 'react'

import ActionFinderFlow from './ActionFinder'
import ActionWrapper from './helpers/ActionWrapper'
import Politics from './Politics'
import Quiz from './Quiz'
import SwitchEnergy from './SwitchEnergy'

const ActionModules = (props) => {
  if (!props.actions) return null

  const renderAction = (action) => {
    switch (action.actionId) {
      case 'switch_energy':
        return <SwitchEnergy key={action.actionId} module={action} />
      case 'action_finder':
        return <ActionFinderFlow key={action.actionId} module={action} />
      case 'politics':
        return <Politics key={action.actionId} module={action} />
      case 'quiz':
        return <Quiz key={action.actionId} module={action} />
      default:
        return <div />
    }
  }

  return props.actions.map((action, i) => (
    <ActionWrapper
      color={`color-${(i % 4) + 1}`}
      effort={action.effort}
      id={action.id}
      impact={action.impact}
      key={action.id}
      name={action.name}
      otherUsers={0}
    >
      {renderAction(action, i)}
    </ActionWrapper>
  ))
}

export default ActionModules
