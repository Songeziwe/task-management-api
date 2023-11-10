import db from './_db.js'

export const resolvers = {
  Query: {
    tasks() {
      return db.tasks
    },
    users() {
      return db.users
    }
  }
}