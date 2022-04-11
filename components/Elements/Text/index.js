import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import React from 'react'

import { TEXT_RENDERER, trackEvent } from '../../../services/analytics'
import { replaceTextVars } from '../../../utils/text'
import { HeroWithImage } from '../HeroWithImage'
import { ImageText } from '../ImageText'
import { TrackingOptOutButton } from '../TrackingOptOutButton'
import { VideoText } from '../VideoText'

const renderBlockSection = (entry) => {
  switch (entry.layout) {
    case 'hero-with-image': {
      return <HeroWithImage {...entry} />
    }
    case 'image-text': {
      return <ImageText {...entry} variant={entry.layout} />
    }
    case 'text-video': {
      return <VideoText {...entry} variant={entry.layout} />
    }
    case 'text-image': {
      return <ImageText {...entry} variant={entry.layout} />
    }
    default: {
      return null
    }
  }
}

const renderInlineNavigationElement = (entry) => {
  switch (entry.action) {
    case 'remove-analytics-cookie': {
      return <TrackingOptOutButton label={entry.title} />
    }
    default: {
      trackEvent({
        collection: process.env.NEXT_PUBLIC_GRAPH_JSON_ERRORS_COLLECTION,
        name: TEXT_RENDERER,
        values: {
          message: `Unhandeled link action: ${entry.action}`,
        },
      })
      return null
    }
  }
}

const createRenderOptions = (vars) => ({
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      const href = typeof node.data.uri === 'string' ? node.data.uri : ''
      return (
        <a href={href} rel="noreferrer" target="_blank">
          {children}
        </a>
      )
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const entry = node.data?.target
      const entryType = entry?.sys?.contentType?.sys?.id
      switch (entryType) {
        case 'section':
          return renderBlockSection(entry?.fields)

        default:
          return null
      }
    },
    [INLINES.EMBEDDED_ENTRY]: (node) => {
      const entry = node.data?.target
      const entryType = entry?.sys?.contentType?.sys?.id

      switch (entryType) {
        case 'navigationElement':
          return renderInlineNavigationElement(entry?.fields)

        default:
          trackEvent({
            collection: process.env.NEXT_PUBLIC_GRAPH_JSON_ERRORS_COLLECTION,
            name: 'Text_renderer',
            values: {
              message: `Unhandeled inline embedded entry: ${entryType}`,
            },
          })
          return null
      }
    },
  },
  renderText: (text) => {
    return replaceTextVars(text, vars)
  },
})

export const Text = ({ block, vars }) => {
  if (!block) return null
  if (typeof block === 'string') return block

  return documentToReactComponents(
    block,
    createRenderOptions(vars, block.links)
  )
}
