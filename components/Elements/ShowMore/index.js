require('./styles.less')

import { Button } from 'antd'
import React, { createRef, useEffect, useState } from 'react'

export const ShowMore = ({ maxHeight, text }) => {
  const [isShowMoreVisible, setIsShowMoreVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const contentRef = createRef(null)

  useEffect(() => {
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
            className="colored"
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
