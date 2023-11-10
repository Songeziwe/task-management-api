export const typeDefs = `#graphql
  type User {
    id: ID!,
    name: String!,
    surname: String,
  }
  type Task {
    id: ID!,
    content: String!,
    complete: Boolean! 
  }

  type Query {
    tasks: [Task]
    users: [User]
  }
`