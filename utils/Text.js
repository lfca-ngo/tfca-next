import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import React from 'react'

export const Text = ({ asString, block }) => {
  if (!block) return null
  if (asString) return documentToPlainTextString(block.json)
  else
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: documentToHtmlString(block.json),
        }}
      />
    )
}

// Sometimes we just need to get the plain text from a block
export const text = (block) => documentToPlainTextString(block.json) || ''
