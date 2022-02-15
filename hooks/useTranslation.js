import { gql } from 'graphql-request' // use react-query
import { useRouter } from 'next/router'
import React, { createContext, useContext, useEffect, useState } from 'react'

import { fetchContent } from '../services/contentfulBadge'
import { defaultLangKey } from '../utils/siteConfig'

const TranslationContext = createContext()

const query = gql`
  query getTranslations($locale: String!) {
    blockCollection(locale: $locale) {
      items {
        key
        value
      }
    }
    navigationCollection(locale: $locale, limit: 20) {
      items {
        title
        menuId
        elementsCollection(limit: 20) {
          items {
            ... on Navigation {
              title
              menuId
              elementsCollection(limit: 20) {
                items {
                  ... on NavigationElement {
                    title
                    url
                    slug
                  }
                }
              }
            }
            ... on NavigationElement {
              title
              url
              slug
            }
          }
        }
      }
    }
    metaDataCollection(where: { name: "Main" }, limit: 1) {
      items {
        name
        languagesCollection {
          items {
            name
            isoCode
            countryCode
            icon {
              url
            }
          }
        }
      }
    }
  }
`

export const TranslationProvider = ({ children }) => {
  const [navs, setNavs] = useState({})
  const [translations, setTranslations] = useState([])
  const [languages, setLanguages] = useState({ active: {}, languages: [] })
  const { locale } = useRouter()

  // when language changes via url
  useEffect(() => {
    async function changeTranslations() {
      const convertedLocale = locale === 'en' ? 'en-US' : locale

      // in contentful default is en-US
      const res = await fetchContent(query, {
        locale: convertedLocale,
      })

      setTranslations(res.blockCollection.items)
      // set the navs
      const navigations = res.navigationCollection.items
      const navsById = navigations.reduce((acc, curr) => {
        acc[curr.menuId] = curr
        return acc
      }, {})
      setNavs(navsById)
      // set the languages
      const languages =
        res.metaDataCollection.items[0].languagesCollection.items
      const active = languages.find((l) => convertedLocale === l.isoCode)
      setLanguages({ active: active, languages })
    }

    changeTranslations(locale)
  }, [locale])

  const getTranslation = (key) => {
    const translation = translations.find((t) => t.key === key) || ''
    return translation.value
  }

  return (
    <TranslationContext.Provider
      value={{
        getTranslation: getTranslation,
        languages: languages,
        locale: locale,
        navs: navs,
      }}
    >
      {children}
    </TranslationContext.Provider>
  )
}

export const useTranslation = (key) => {
  const context = useContext(TranslationContext)
  return context.getTranslation(key)
}

export const useLocalePrefix = () => {
  const context = useContext(TranslationContext)
  const { locale } = context
  if (defaultLangKey === locale) return ''
  else return locale
}

export const useAvailableLanguages = () => {
  const context = useContext(TranslationContext)
  return context.languages
}

export const useNavs = () => {
  const context = useContext(TranslationContext)
  return context.navs
}
