import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { INLINES } from '@contentful/rich-text-types'
import React from 'react'

import { TrackingOptOutButton } from '../components/Elements/TrackingOptOutButton'
import { TEXT_RENDERER, trackEvent } from '../services/analytics'

const getInlineEntryWithId = (links, id) => {
  const link = links.entries?.inline?.find((link) => link.sys?.id === id)

  return link
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
          message: `Unhandeled link action: ${action}`,
        },
      })
      return null
    }
  }
}

const createRenderOptions = (vars, links) => ({
  renderNode: {
    [INLINES.HYPERLINK]: (node, children) => {
      const href = typeof node.data.uri === 'string' ? node.data.uri : ''
      return (
        <a href={href} rel="noreferrer" target="_blank">
          {children}
        </a>
      )
    },
    [INLINES.EMBEDDED_ENTRY]: (node) => {
      const linkId = node.data?.target?.sys?.id
      if (!linkId) return
      const referencedEntry = getInlineEntryWithId(
        links,
        node.data.target.sys.id
      )

      if (!referencedEntry || !referencedEntry.__typename) return null

      switch (referencedEntry.__typename) {
        case 'NavigationElement':
          return renderInlineNavigationElement(referencedEntry)

        default:
          trackEvent({
            collection: process.env.NEXT_PUBLIC_GRAPH_JSON_ERRORS_COLLECTION,
            name: 'Text_renderer',
            values: {
              message: `Unhandeled inline embedded entry: ${referencedEntry.__typename}`,
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

  if (asString) return replaceVars(documentToPlainTextString(block.json), vars)

  return documentToReactComponents(
    block.json,
    createRenderOptions(vars, block.links)
  )
}

// Sometimes we just need to get the plain text from a block
export const text = (block, vars, parseMarkdown = false) => {
  if (!block) return null
  let string =
    typeof block === 'string'
      ? replaceVars(block, vars)
      : replaceVars(documentToPlainTextString(block?.json), vars) || ''

  return parseMarkdown ? parseMarkdownStringToReactComponents(string) : string
}
