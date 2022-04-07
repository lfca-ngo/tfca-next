require('./styles.less')

import { Button } from 'antd'
import React from 'react'

import { ERROR_BOUNDARY, trackEvent } from '../../services/analytics'

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log the error
    trackEvent({
      collection: process.env.NEXT_PUBLIC_GRAPH_JSON_ERRORS_COLLECTION,
      name: ERROR_BOUNDARY,
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
