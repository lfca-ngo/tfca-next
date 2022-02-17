import React from 'react'

import ActionWrapper from './ActionWrapper'
import SwitchEnergy from './SwitchEnergy'

const ActionModules = ({ actions, openDrawer, statsLabels, usageStats }) => {
  if (!actions) return null

  return actions.map((action, i) => {
    let component
    switch (action.actionId) {
      case 'switch_energy':
        component = <SwitchEnergy key={action.actionId} module={action} />
        break
      default:
        component = <div />
        break
    }
    const otherUsers = 0 // usageStats[module.actionId] || 0
    return (
      <ActionWrapper
        actionsCount={actions.length}
        activeStep={i + 1}
        carbonSaved={action.carbonSaved}
        color={`color-${(i % 4) + 1}`}
        key={action.actionId}
        labels={statsLabels}
        name={action.actionId}
        otherUsers={otherUsers}
        timeToImplement={action.timeToImplement}
      >
        {React.cloneElement(component, {
          name: module.name,
          conversionValue: action.carbonSaved / 1000,
          timeToImplement: action.timeToImplement,
          otherUsers: otherUsers,
          openDrawer: openDrawer,
          color: `color-${(i % 4) + 1}`,
        })}
      </ActionWrapper>
    )
  })
}

export default ActionModules
