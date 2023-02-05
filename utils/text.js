import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import React from 'react'

export const replaceTextVars = (text, vars) => {
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
  return string.split(regex).map((s, i) =>
    i % 3 === 2 ? (
      <span className="highlight" key={i}>
        {s}
      </span>
    ) : (
      s
    )
  )
}

// Returns the plain text from a block
export const textBlockToString = (block, vars, parseMarkdown = false) => {
  if (!block) return null
  let string =
    typeof block === 'string'
      ? replaceTextVars(block, vars)
      : replaceTextVars(documentToPlainTextString(block), vars) || ''

  return parseMarkdown ? parseMarkdownStringToReactComponents(string) : string
}
