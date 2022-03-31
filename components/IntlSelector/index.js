require('./styles.less')

import { Form, Popover, Select } from 'antd'
import { useRouter } from 'next/router'
import React from 'react'
import { isMobile } from 'react-device-detect'

import { useContent } from '../../hooks'

export const IntlSelector = () => {
  const router = useRouter()
  const { metaData } = useContent()

  const {
    locale,
    query: { actionCollectionSlug, companySlug, shareToken },
  } = router

  const regions = metaData?.regionsCollection?.items || []

  const regionsByActionCollectionSlug = React.useMemo(() => {
    if (!metaData?.regionsCollection?.items) return {}

    return metaData.regionsCollection.items.reduce((regions, currRegion) => {
      const actionCollectionSlug = currRegion.actionCollection.slug
      const languagesByIsoCode = currRegion.languagesCollection.items.reduce(
        (languages, currLanguage) => {
          languages[currLanguage.isoCode] = currLanguage
          return languages
        },
        {}
      )
      regions[actionCollectionSlug] = {
        ...currRegion,
        languagesByIsoCode,
      }

      return regions
    }, {})
  }, [metaData?.regionsCollection?.items])

  const activeRegion =
    regionsByActionCollectionSlug[actionCollectionSlug] ||
    regionsByActionCollectionSlug['int']
  const activeLanguage =
    activeRegion?.languagesByIsoCode[locale] || activeRegion?.defaultLanguage

  return (
    <div className="intl-selector">
      <Popover
        content={
          <Form layout="vertical">
            <Form.Item label="Region">
              <Select
                onChange={(newActionCollectionSlug) =>
                  handleRegionOrLocaleChange({ newActionCollectionSlug })
                }
                value={activeRegion?.actionCollection.slug}
              >
                {regions.map((region) => (
                  <Select.Option key={region.actionCollection.slug}>
                    <div
                      className="intl-icon-full"
                      style={{
                        backgroundImage: `url(${region.icon.url})`,
                      }}
                    />
                    {region.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Language">
              <Select
                onChange={(newLocale) =>
                  handleRegionOrLocaleChange({ newLocale })
                }
                value={activeLanguage?.isoCode}
              >
                {activeRegion?.languagesCollection.items.map((lang) => (
                  <Select.Option key={lang.isoCode}>
                    <div
                      className="intl-icon-full"
                      style={{
                        backgroundImage: `url(${lang.icon.url})`,
                      }}
                    />
                    {lang.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        }
        destroyTooltipOnHide={true}
        overlayClassName="intl-selector-popover"
        placement={isMobile ? 'right' : 'right'}
      >
        <div className="intl-icon">
          <div
            className="intl-icon-half left"
            style={
              (activeRegion?.icon.url && {
                backgroundImage: `url(${activeRegion.icon.url})`,
              }) ||
              undefined
            }
          />
          <div
            className="intl-icon-half right"
            style={
              (activeLanguage?.icon.url && {
                backgroundImage: `url(${activeLanguage.icon.url})`,
              }) ||
              undefined
            }
          />
        </div>
      </Popover>
    </div>
  )

  function handleRegionOrLocaleChange({ newActionCollectionSlug, newLocale }) {
    let path = `/${newActionCollectionSlug || actionCollectionSlug}`

    if (companySlug) {
      path += `/co/${companySlug}`
    } else if (shareToken) {
      path = `/invite/${shareToken}`
    }

    router.push(path, path, {
      locale:
        newLocale ||
        regionsByActionCollectionSlug[
          newActionCollectionSlug || actionCollectionSlug
        ].defaultLanguage.isoCode,
    })
  }
}
