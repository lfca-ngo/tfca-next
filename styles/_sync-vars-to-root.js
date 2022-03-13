const fs = require('fs')
const path = require('path')

// Avoid too long formatting
const vars = fs
  .readFileSync(path.resolve(__dirname, './ant-default-vars.less'), 'utf-8')
  .replace(/,\n/g, ',')

const matchs = vars.match(/^@.*/gm)

const allVars = matchs.map((m) => {
  const mv = m.match(/^@(.*?):.*;/m)
  if (mv && mv[1]) return mv[1]
})

const HEADER = `@import (reference) './ant-default-vars.less';
:root {
`

const FOOTER = `}
`

let CONTENT = ''

allVars.forEach((v) => {
  // --screen-md: @screen-md;
  if (!v) return

  CONTENT += `  --${v}: @${v};\n`
})

fs.writeFileSync(
  path.resolve(__dirname, './variables-css.less'),
  `${HEADER}${CONTENT}${FOOTER}`
)
