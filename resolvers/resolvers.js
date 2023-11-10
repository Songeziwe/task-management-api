import { AppDataSource } from '../dbConfig.js'

const taskRepository = AppDataSource.getRepository('Task')
const userRepository = AppDataSource.getRepository('User')

export const resolvers = {
  // Getters
  Query: {
    async tasks() {
      return await taskRepository.find()
    },
    async users() {
      return await userRepository.find()
    },
    async getTaskById(_, args) {
      return await taskRepository.findOneBy({ id: args.id })
    },
    async getUserById(_, args) {
      return await userRepository.findOneBy({ id: args.id })
    }
  },
  // Mutators
  Mutation: {
    // delete task by id
    // return the deleted task
    async deleteTaskById(_, args) {
      const task = await taskRepository.findOneBy({ id: args.id })
      if(!task) return null

      await taskRepository.delete(task.id)
      return task
    },
    // update task by id
    // return the updated task
    async updateTaskById(_, args) {
      await taskRepository.update(args.id, { ...args.updates })
      return await taskRepository.findOneBy({ id: args.id })
    },
    // create a new user
    // return the created user
    async createUser(_, args) {
      const newUser = {
        ...args.userInfo,
      }
      const result = await userRepository.save(newUser)

      return result
    },
    // create a new user
    // return the created user
    async createTask(_, args) {
      const newTask = {
        ...args.taskInfo,
      }
      const result = await taskRepository.save(newTask)

      return result
    },
  },
  Task: {
    async user(parent) {
      return await userRepository.findOneBy({ id: parent.userId })
    }
  }
}