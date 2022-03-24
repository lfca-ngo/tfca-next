import React from 'react'

export const GroupWrapper = ({ children, description, label }) => {
  return (
    <div className="form-group">
      <div className="form-group-inner">
        {label && <div className="form-group-label">{label}</div>}
        {description && (
          <div className="form-group-description">{description}</div>
        )}
        {children}
      </div>
    </div>
  )
}
