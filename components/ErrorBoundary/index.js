require('./styles.less')

import { Button } from 'antd'
import React from 'react'
import { withCookies } from 'react-cookie'

import { trackEvent } from '../../services/analytics'
import { getWindowUid, INTERNAL_COOKIE } from '../../utils'

class EB extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    const userId = this.props.cookies.get(INTERNAL_COOKIE) || getWindowUid()

    // // Log the error
    trackEvent({
      collection: 'errors',
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

export const ErrorBoundary = withCookies(EB)
