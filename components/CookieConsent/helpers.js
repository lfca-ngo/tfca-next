import { QuestionCircleOutlined } from '@ant-design/icons'
import Icon from '@ant-design/icons'
import { Popover } from 'antd'
import React from 'react'

import IconCheck from '../../assets/icons/c-check.svg'
import IconRemove from '../../assets/icons/c-remove.svg'

export const SAME_SITE_OPTIONS = {
  LAX: 'lax',
  NONE: 'none',
  STRICT: 'strict',
}

export const ConditionalWrapper = ({ children, condition, wrapper }) => {
  return condition ? wrapper(children) : children
}

export const CookieSelector = (props) => {
  return (
    <li className={props.isActive ? 'active' : ''}>
      <div>
        <Icon
          component={props.isActive ? IconCheck : IconRemove}
          onClick={() => !props.disabled && props.toggleValue(!props.isActive)}
        />{' '}
        {props.title}
        {props.showInfo && (
          <Popover
            content={props.infoBox}
            overlayClassName={'cookie-popover popover-sm'}
          >
            <QuestionCircleOutlined className="add-info" />
          </Popover>
        )}
      </div>
    </li>
  )
}
