require('./styles.less')

import { Button } from 'antd'
import React from 'react'

export const ShowMore = ({ maxHeight, text }) => {
  const [isShowMoreVisible, setIsShowMoreVisible] = React.useState(false)
  const [isExpanded, setIsExpanded] = React.useState(false)
  const contentRef = React.createRef(null)

  React.useEffect(() => {
    const element = contentRef.current
    if (!element.return)
      setIsShowMoreVisible(element.scrollHeight > element.clientHeight)
  }, [contentRef])

  return (
    <div className="show-more">
      <div
        className="content"
        ref={contentRef}
        style={!isExpanded ? { maxHeight: maxHeight } : undefined}
      >
        {text}
      </div>

      {(isShowMoreVisible || isExpanded) && (
        <div className="show-more">
          <div
            className="fade-out"
            style={{
              opacity: isExpanded ? 0 : 1,
            }}
          />
          <Button
            ghost
            onClick={() => setIsExpanded((v) => !v)}
            size="small"
            type="primary"
          >
            {`show ${isExpanded ? 'less' : 'more'}`}
          </Button>
        </div>
      )}
    </div>
  )
}
