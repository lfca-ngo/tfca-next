require('./styles.less')

import React from 'react'

import { ActionDetails } from './ActionDetails'
import { BankDetails } from './BankDetails'
import { EnergyProviderDetails } from './EnergyProviderDetails'
import { OrganizationDetails } from './OrganizationDetails'
import { PoliticianDetails } from './PoliticianDetails'

export const DetailView = (props) => {
  switch (props.layout) {
    case 'action':
      return <ActionDetails {...props} />
    case 'bank':
      return <BankDetails {...props} />
    case 'organization':
      return <OrganizationDetails {...props} />
    case 'energy-provider':
      return <EnergyProviderDetails {...props} />
    case 'politician':
      return <PoliticianDetails {...props} />
    default:
      return null
  }
}
