export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    surname: String
  }
  type Task {
    id: ID!
    content: String!
    complete: Boolean!
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
    updateTaskById(id: ID!, updates: TaskUpdates!): Task
    createUser(userInfo: UserInfo!): [User]
  }

  input TaskUpdates {
    content: String
    complete: Boolean
  }

  input UserInfo {
    name: String!
    surname: String!
  }
`