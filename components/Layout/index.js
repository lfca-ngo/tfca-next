import React from 'react'

import { EMBED, ERROR, WITH_SIDEBAR } from '../../utils'
import { ActionsLayout } from './ActionsLayout'
import { BasicLayout } from './BasicLayout'
import { EmbedLayout } from './EmbedLayout'
import { ErrorLayout } from './ErrorLayout'

export const Layout = (props) => {
  switch (props.layout) {
    case ERROR:
      return <ErrorLayout {...props} />
    case EMBED:
      return <EmbedLayout {...props}>{props.children}</EmbedLayout>
    case WITH_SIDEBAR:
      return <ActionsLayout {...props}>{props.children}</ActionsLayout>
    default:
      return <BasicLayout {...props}>{props.children}</BasicLayout>
  }
}
