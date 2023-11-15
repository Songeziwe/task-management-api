export const typeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    surname: String!
    token: String!
    email: String!
  }
  type Task {
    id: ID!
    content: String!
    complete: Boolean!
    user: User!
  }

  type Query {
    tasks: [Task]
    users: [User]
    getTaskById(id: ID!): Task
    getUserById(id: ID!): User
  }

  type Mutation {
    deleteTaskById(id: ID!): Task
    updateTaskById(id: ID!, updates: TaskUpdates!): Task
    createUser(userInfo: UserInfo!): User
    createTask(taskInfo: TaskInfo!): Task
    signIn(signInInput: SignInInput!): User
    signUp(signUpInput: SignUpInput!): User
  }

  input TaskUpdates {
    content: String
    complete: Boolean
  }

  input TaskInfo {
    content: String!
    complete: Boolean!
    userId: ID!
  }

  input UserInfo {
    name: String!
    surname: String!
    email: String!
    password: String!
  }

  input SignInInput {
    email: String!
    password: String!
  }
  input SignUpInput {
    name: String!
    surname: String!
    email: String!
    password: String!
  }
`