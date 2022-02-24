import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import React from 'react'

const replaceVars = (text, vars) => {
  let s = text
  for (const prop in vars) {
    s = s.replace(new RegExp('{{' + prop + '}}', 'g'), vars[prop])
  }
  return s
}

export const Text = ({ asString, block, vars }) => {
  if (!block) return null
  const blockAsString = documentToPlainTextString(block.json)
  const blockAsHtmlString = documentToHtmlString(block.json)

  if (asString) return replaceVars(blockAsString, vars)
  else
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: replaceVars(blockAsHtmlString, vars),
        }}
      />
    )
}

// Sometimes we just need to get the plain text from a block
export const text = (block, vars) =>
  documentToPlainTextString(replaceVars(block.json, vars)) || ''
