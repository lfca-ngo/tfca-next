require('./styles.less')

import React from 'react'

import { ActionCard } from './ActionCard'
import { BankCard } from './BankCard'
import { EnergyProviderCard } from './EnergyProviderCard'
import { OrganizationCard } from './OrganizationCard'
import { PoliticianCard } from './PoliticianCard'
import { ProviderCard } from './ProviderCard'

export const CardView = (props) => {
  switch (props.layout) {
    case 'politician':
      return <PoliticianCard {...props} />
    case 'action':
      return <ActionCard {...props} />
    case 'bank':
      return <BankCard {...props} />
    case 'tool':
    case 'organization':
      return <OrganizationCard {...props} />
    case 'energy-provider':
      return <EnergyProviderCard {...props} />
    case 'provider':
      return <ProviderCard {...props} />
    default:
      return null
  }
}
