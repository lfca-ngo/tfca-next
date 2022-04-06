import { isDev } from '../../utils'
import { fetchContent } from './fetch-content'
import { actionQuery } from './queries'

// Fetch all action module related content
export const fetchActionDataById = async (id, locale) => {
  const { action } = await fetchContent(actionQuery, {
    blocksLimit: id.blocksLimit,
    dataLimit: id.dataLimit,
    id: id.id,
    listsLimit: id.listsLimit,
    locale: locale,
    preview: isDev,
    quizLimit: id.quizLimit,
  })

  return action
}
