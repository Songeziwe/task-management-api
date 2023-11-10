import db from './_db.js'

export const resolvers = {
  // Getters
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
  },
  // Mutators
  Mutation: {
    // delete task by id
    // return the remaining tasks
    deleteTaskById(_, args) {
      db.tasks = db.tasks.filter(task => task.id !== args.id)
      return db.tasks
    },
    // update task by id
    // return the updated task
    updateTaskById(_, args) {
      db.tasks = db.tasks.map(task => {
        if(task.id === args.id) {
          return { ...task, ...args.updates }
        }
        return task
      })
      return db.tasks.find(task => task.id === args.id)
    },
    // create a new user
    // return the created user
    createUser(_, args) {
      const newUser = {
        ...args.userInfo,
        id: Math.floor(Math.random() * 10000)
      }
      db.users.push(newUser)
      return newUser
    }
  }
}