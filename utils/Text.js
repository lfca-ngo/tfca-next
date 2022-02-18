import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import React from 'react'

const Text = ({ asString, block }) => {
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

export default Text
