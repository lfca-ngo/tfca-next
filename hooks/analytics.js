import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { trackEvent as trackRaw } from '../services/analytics'
import { useCustomization } from './app'
import { useUserId } from './user'

export const useAnalytics = () => {
  const { locale, query } = useRouter()
  const customization = useCustomization()
  const userId = useUserId()

  const trackEvent = useCallback(({ collection, name, values }) => {
    trackRaw({
      action_collection_slug: query.actionCollectionSlug,
      collection,
      inviting_uid: customization?.referredByUserId,
      locale,
      name,
      userId,
      values,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    trackEvent,
  }
}
