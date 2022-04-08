import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { trackEvent as trackRaw } from '../services/analytics'
import { useCustomization } from './app'

export const useAnalytics = () => {
  const { locale, query } = useRouter()
  const customization = useCustomization()

  const trackEvent = useCallback(
    ({ collection, name, values }) => {
      trackRaw({
        action_collection_slug: query.actionCollectionSlug,
        collection,
        inviting_uid: customization?.uid,
        locale,
        name,
        values,
      })
    },
    [customization, locale, query]
  )

  return {
    trackEvent,
  }
}
