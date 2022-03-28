import { gql } from 'graphql-request'

export const DataToolFragment = gql`
  fragment DataToolFragment on DataTool {
    name
    logo {
      url
    }
  }
`
