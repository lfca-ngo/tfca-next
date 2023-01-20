import React from 'react'

import {
  INTL_SELECTOR,
  INVITE_STATUS,
  PERSONAL_SCORE,
  TOGGLE_Q_AND_A,
} from '../../../utils'
import { CompanyMenuItem } from './CompanyMenuItem'
import { MenuItem } from './MenuItem'

export const MainMenu = ({ className = '', company }) => {
  return (
    <ul className={`main-menu ${className}`}>
      <MenuItem
        key="score"
        link={{ action: PERSONAL_SCORE, title: 'Team Leaderboard' }}
      />
      {company && <CompanyMenuItem company={company} key="company" />}
      <MenuItem key="invited" link={{ action: INVITE_STATUS }} />
      <MenuItem key="qa" link={{ action: TOGGLE_Q_AND_A, title: 'About' }} />
      <MenuItem key="intl" link={{ action: INTL_SELECTOR }} />
    </ul>
  )
}
