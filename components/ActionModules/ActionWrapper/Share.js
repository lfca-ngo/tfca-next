import { Button, Input, Tooltip } from 'antd'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { text } from '../../../utils/Text'
import Category from './Category'

const { TextArea } = Input

export const Share = (props) => {
  const { goTo, store } = props
  const { shareLink } = store

  const [hasCopied, setHasCopied] = React.useState(false)

  return (
    <div className="step">
      <Category
        title={text(props.blocks['category.title'])}
        type={props.name}
      />
      {!shareLink ? (
        <>
          <h2>Something went wrong...</h2>
          <button onClick={() => goTo('success')}>Go back</button>
        </>
      ) : (
        <>
          <h2>Share the link! Go go go!</h2>

          <TextArea autoSize={true} disabled={true} value={shareLink} />
          <CopyToClipboard onCopy={() => setHasCopied(true)} text={shareLink}>
            <Tooltip placement="topLeft" title="Copied" visible={hasCopied}>
              <Button>Copy to clipboard with button</Button>
            </Tooltip>
          </CopyToClipboard>
        </>
      )}
    </div>
  )
}
