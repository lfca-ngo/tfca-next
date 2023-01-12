import React from 'react'

import {
  BASIC_LAYOUT,
  EMBED_LAYOUT,
  ERROR_LAYOUT,
  WITH_SIDEBAR_LAYOUT,
} from '../../utils'
import { ActionsLayout } from './ActionsLayout'
import { DefaultLayout } from './DefaultLayout'
import { EmbedLayout } from './EmbedLayout'
import { ErrorLayout } from './ErrorLayout'
import { BasicLayout } from './LandingLayout'

export const Layout = (props) => {
  switch (props.layout) {
    case ERROR_LAYOUT:
      return <ErrorLayout {...props} />
    case EMBED_LAYOUT:
      return <EmbedLayout {...props}>{props.children}</EmbedLayout>
    case WITH_SIDEBAR_LAYOUT:
      return <ActionsLayout {...props}>{props.children}</ActionsLayout>
    case BASIC_LAYOUT:
      return <BasicLayout {...props}>{props.children}</BasicLayout>
    default:
      return <DefaultLayout {...props}>{props.children}</DefaultLayout>
  }
}
