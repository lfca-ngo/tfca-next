import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import React from 'react'

import { HeroWithImage } from '../components/Elements/HeroWithImage'
import { ImageText } from '../components/Elements/ImageText'
import { TrackingOptOutButton } from '../components/Elements/TrackingOptOutButton'
import { TEXT_RENDERER, trackEvent } from '../services/analytics'

const renderBlockSection = (entry) => {
  switch (entry.layout) {
    case 'hero-with-image': {
      return <HeroWithImage {...entry} />
    }
    case 'image-text': {
      return <ImageText {...entry} variant={entry.layout} />
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
    return replaceVars(text, vars)
  },
})

const replaceVars = (text, vars) => {
  let s = text
  for (const prop in vars) {
    s =
      (typeof s === 'string' &&
        s.replace(new RegExp('{{' + prop + '}}', 'g'), vars[prop])) ||
      ''
  }
  return s
}

// Adopted from https://stackoverflow.com/a/59202370
const parseMarkdownStringToReactComponents = (string) => {
  // Currently we only support *bold* marks
  const regex = /((?:^|[^\\])(?:\\.)*)\*((?:\\.|[^*])*)\*/g
  return string
    .split(regex)
    .map((s, i) => (i % 3 === 2 ? <strong key={i}>{s}</strong> : s))
}

export const Text = ({ asString, block, vars }) => {
  if (!block) return null
  if (typeof block === 'string') return block

  if (asString) return replaceVars(documentToPlainTextString(block), vars)

  return documentToReactComponents(
    block,
    createRenderOptions(vars, block.links)
  )
}

// Sometimes we just need to get the plain text from a block
export const text = (block, vars, parseMarkdown = false) => {
  if (!block) return null
  let string =
    typeof block === 'string'
      ? replaceVars(block, vars)
      : replaceVars(documentToPlainTextString(block), vars) || ''

  return parseMarkdown ? parseMarkdownStringToReactComponents(string) : string
}
