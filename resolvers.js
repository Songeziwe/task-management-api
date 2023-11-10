import db from './_db.js'

export const resolvers = {
  Query: {
    tasks() {
      return db.tasks
    },
    users() {
      return db.users
    },
    getTaskById(_, args) {
      return db.tasks.find(task => task.id === args.id)
    },
    getUserById(_, args) {
      return db.users.find(user => user.id === args.id)
    }
  }
}