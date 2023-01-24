require('./styles.less')

import { ForkOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button } from 'antd'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React from 'react'

import { useCustomization } from '../../../hooks'
import { IntlSelector } from '../../IntlSelector'
import { TimeCounter } from '../../TimeCounter'
import { MenuItem } from './MenuItem'

export const MainMenu = ({ className = '', company, mode }) => {
  const { query } = useRouter()
  const team = query.team
  const customization = useCustomization()

  return (
    <ul className={classNames(`main-menu`, className, mode)}>
      {/* {company && <CompanyMenuItem company={company} key="company" />} */}

      <MenuItem
        showCaret
        submenuItems={[
          <MenuItem key="test" title="Test" />,
          <MenuItem key="another" title="Another" />,
        ]}
        title={'About'}
      />
      {team && (
        <MenuItem
          icon={<Avatar icon={<ForkOutlined />} shape="square" />}
          title="Team"
        />
      )}
      <MenuItem
        icon={<Avatar icon={<UserOutlined />} shape="square" />}
        title="You"
      />
      <MenuItem className="padding-small" title={<TimeCounter />} />
      <MenuItem
        className="padding-small"
        title={
          <Button size="small" type="primary">
            Share
          </Button>
        }
      />
      <MenuItem title={<IntlSelector />} />
    </ul>
  )
}
