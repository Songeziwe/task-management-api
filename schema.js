export const typeDefs = `#graphql
  type User {
    id: ID!,
    name: String!,
    surname: String,
  }
  type Task {
    id: ID!,
    content: String!,
    complete: Boolean!,
    userId: ID!
  }

  type Query {
    tasks: [Task]
    users: [User]
    getTaskById(id: ID!): Task
    getUserById(id: ID!): User
  }

  type Mutation {
    deleteTaskById(id: ID!): [Task]
  }
`