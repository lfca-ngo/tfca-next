import axios from 'axios'
import { useMutation } from 'react-query'

export const useCreateUniqueUserName = () => {
  return useMutation({
    mutationFn: ({ firstName, teamId, userId }) => {
      return axios.post('/api/teams/create-unique-user-name', {
        firstName,
        teamId,
        userId,
      })
    },
  })
}
