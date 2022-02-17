require('./styles.less')

import Link from 'next/link'
import React from 'react'

const LINKS = [
  { title: 'Datenschutz', url: 'privacy' },
  { title: 'Impressum', url: 'imprint' },
]

const SimpleFooter = (props) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          {LINKS.map((link, i) => {
            return (
              <Link href={link.url} key={`link-${i}`}>
                {link.title}
              </Link>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default SimpleFooter