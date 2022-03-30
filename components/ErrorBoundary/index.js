require('./styles.less')

import { Button } from 'antd'
import React from 'react'

import { trackEvent } from '../../services/analytics'
import { getCookie, getWindowUid, UID_COOKIE_NAME } from '../../utils'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    const userId = getCookie(UID_COOKIE_NAME) || getWindowUid()

    // // Log the error
    trackEvent({
      collection: process.env.NEXT_PUBLIC_GRAPH_JSON_ERRORS_COLLECTION,
      name: 'error_boundary',
      userId,
      values: {
        message: error.message || 'Unknown message',
        ...errorInfo,
      },
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong...</h2>
          <p>The error has been automatically reported.</p>
          <Button onClick={() => window.location.reload()}>Reload</Button>
        </div>
      )
    }

    return this.props.children
  }
}
