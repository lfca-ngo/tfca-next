import axios from 'axios'
import { useMutation } from 'react-query'

export const useSubscribeUserToMailingList = (options = {}) => {
  return useMutation({
    mutationFn: (payload) => {
      return axios.post('/api/subscribe-to-mailing-list', payload)
    },
    ...options,
  })
}
