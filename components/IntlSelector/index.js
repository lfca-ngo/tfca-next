require('./styles.less')

import { Form, Popover, Select } from 'antd'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'

import { useContent } from '../../hooks'

export const IntlSelector = () => {
  const router = useRouter()
  const { metaData } = useContent()

  const {
    locale,
    query: { actionCollectionSlug, companySlug, shareToken },
  } = router

  const regions = metaData?.regions || []

  const regionsByActionCollectionSlug = useMemo(() => {
    if (!metaData?.regions) return {}

    return metaData.regions.reduce((regions, currRegion) => {
      const actionCollectionSlug = currRegion.actionCollection.slug
      const languagesByIsoCode = currRegion.languages.reduce(
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
  }, [metaData?.regions])

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
                size="small"
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
                size="small"
                value={activeLanguage?.isoCode}
              >
                {activeRegion?.languages.map((lang) => (
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
        placement="left"
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

    if (shareToken) {
      path += `/invite/${shareToken}`
    } else if (companySlug) {
      path += `/co/${companySlug}`
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
