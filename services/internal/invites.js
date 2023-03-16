import axios from 'axios'
import { useMutation } from 'react-query'

export const useCreateInvites = (options = {}) => {
  return useMutation({
    mutationFn: (payload) => {
      return axios.post('/api/create-shareable-link', payload)
    },
    ...options,
  })
}
