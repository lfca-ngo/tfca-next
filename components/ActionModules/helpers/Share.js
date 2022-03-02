import { Button, Input, Tabs, Tooltip } from 'antd'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { text } from '../../../utils/Text'
import Category from './Category'

const { TextArea } = Input
const { TabPane } = Tabs

export const Share = (props) => {
  const { shareLink } = props

  const [hasCopied, setHasCopied] = React.useState(false)

  return (
    <div>
      <h2>Ready! Invite your friends</h2>
      <Tabs defaultActiveKey="1">
        <TabPane key="1" tab="Tab 1">
          Content of Tab Pane 1
        </TabPane>
      </Tabs>
      {!shareLink ? (
        <>
          <h2>Something went wrong...</h2>
          <button onClick={() => goTo('success')}>Go back</button>
        </>
      ) : (
        <>
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
