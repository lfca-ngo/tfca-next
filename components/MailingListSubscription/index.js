require('./styles.less')

import { LoadingOutlined } from '@ant-design/icons'
import { Col, Row } from 'antd'
import React, { useState } from 'react'
import HubspotForm from 'react-hubspot-form'

import { DownloadKit } from './DownloadKit'

const CSS_STYLES = `
.hs-form.hs-custom-style * {
  font-family: 'Poppins';
  font-size: 17px;
  color: #525252cc;
}
.hs-form.hs-custom-style .hs-richtext {
  font-family: 'Poppins';
  font-size: 17px;
  color: #525252cc;
}
.hs-form.hs-custom-style .field label span {
  color: #1e1e1e;
}
.hs-form.hs-custom-style .hs-input:not([type=checkbox]):not([type=radio]) {
  border-radius: 10px;
  background: #fff;
  max-width: none;
  width: 100%;
}
.hs-form.hs-custom-style .hs-input:not([type=file]) {
  background: #fff;
}
.hs-form.hs-custom-style .hs-button {
  font-family: 'Poppins';
  background: #ffc839;
  color: #1e1e1e;
  font-size: 17px;
  border: none;
  font-weight: 500;
  width: 100%;
  padding: 20px 0;
  border-radius: 10px;
}
.hs-form.hs-custom-style .hs-button:hover {
  font-family: 'Poppins';
  background: #e6b72e;
  color: #1e1e1e;
  font-size: 17px;
  border: none;
}
.hbspt-form .hs-main-font-element {
  font-family: 'Poppins';
  font-size: 17px;
  color: #525252cc;
  margin: 0 0 20px;
}
`

export const MailingListSubscription = () => {
  const [isSuccess, setIsSuccess] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleFormReady = () => {
    // 500ms delay to allow the form to load
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }

  const handleFinish = () => {
    setIsSuccess(true)
  }

  return (
    <div className="mailing-list-subscription">
      <div className="container">
        <Row justify="center">
          <Col lg={14} md={20} xs={24}>
            <h2>Download the social media kit</h2>{' '}
            <p>
              Share the campaign with your network and help us reach our goal of
              100M people taking climate action.
            </p>
            {isSuccess ? (
              <DownloadKit />
            ) : (
              <div>
                {loading && (
                  <div
                    className="page-loading-spinner"
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                      margin: '50px 0',
                    }}
                  >
                    <LoadingOutlined style={{ fontSize: '30px' }} />
                  </div>
                )}
                <div
                  className={`hubspot-form-wrapper ${
                    loading ? 'loading' : null
                  }`}
                >
                  <HubspotForm
                    cssClass="hubspot-form"
                    cssRequired={CSS_STYLES}
                    formId={process.env.NEXT_PUBLIC_HUBSPOT_FORM_ID}
                    key={loading}
                    onFormReady={handleFormReady}
                    onFormSubmitted={handleFinish}
                    portalId={process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID}
                    target="#test"
                  />
                </div>
                <div id="test" />
              </div>
            )}
          </Col>
        </Row>
      </div>
    </div>
  )
}
