import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import React from 'react'

export const replaceVars = (text, vars) => {
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

// Returns the plain text from a block
export const text = (block, vars, parseMarkdown = false) => {
  if (!block) return null
  let string =
    typeof block === 'string'
      ? replaceVars(block, vars)
      : replaceVars(documentToPlainTextString(block), vars) || ''

  return parseMarkdown ? parseMarkdownStringToReactComponents(string) : string
}
