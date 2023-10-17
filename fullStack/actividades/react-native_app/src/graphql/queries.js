import {gql} from "apollo-boost";

export const GET_REPOSITORIES = gql`
query {
  repositories {
    edges {
      node {
        createdAt
        description
        forksCount
        fullName
        id
        language
        name
        ownerAvatarUrl
        openIssuesCount
        ownerName
        ratingAverage
        reviewCount
        stargazersCount
        url
        userHasReviewed
        watchersCount
      }
    }
  }
}
`