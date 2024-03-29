import React from 'react'

import {
  EMBED_LAYOUT,
  ERROR_LAYOUT,
  FULL_SCREEN_LAYOUT,
  LANDING_LAYOUT,
  WITH_SIDEBAR_LAYOUT,
} from '../../utils'
import { ActionsLayout } from './ActionsLayout'
import { DefaultLayout } from './DefaultLayout'
import { EmbedLayout } from './EmbedLayout'
import { ErrorLayout } from './ErrorLayout'
import { FullScreenLayout } from './FullScreenLayout'

export const Layout = (props) => {
  switch (props.layout) {
    case FULL_SCREEN_LAYOUT:
      return <FullScreenLayout {...props}>{props.children}</FullScreenLayout>
    case ERROR_LAYOUT:
      return <ErrorLayout {...props} />
    case EMBED_LAYOUT:
      return <EmbedLayout {...props}>{props.children}</EmbedLayout>
    case WITH_SIDEBAR_LAYOUT:
      return <ActionsLayout {...props}>{props.children}</ActionsLayout>
    case LANDING_LAYOUT:
      return <DefaultLayout {...props}>{props.children}</DefaultLayout>
    default:
      return (
        <DefaultLayout withContainer withPageTitle {...props}>
          {props.children}
        </DefaultLayout>
      )
  }
}
