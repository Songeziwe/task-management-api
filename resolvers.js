import db from './_db.js'
import { AppDataSource } from './dbConfig.js'

const taskRepository = AppDataSource.getRepository('Task')
const userRepository = AppDataSource.getRepository('User')

export const resolvers = {
  // Getters
  Query: {
    async tasks() {
      return await taskRepository.find()
    },
    users() {
      return db.users
    },
    async getTaskById(_, args) {
      return await taskRepository.findOneBy({ id: args.id })
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
    async createUser(_, args) {
      const newUser = {
        ...args.userInfo,
      }
      // console.log({ newUser })
      const result = await userRepository.save(newUser)

      return result
    }
  }
}