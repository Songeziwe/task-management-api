import { AppDataSource } from '../dbConfig.js'
import { auth } from '../middleware/auth.js'

const taskRepository = AppDataSource.getRepository('Task')
const userRepository = AppDataSource.getRepository('User')

export const taskResolver = {
  Query: {
    async tasks(_, args, ctx) {
      const email = await auth(ctx.req)
      const user = await userRepository.findOneBy({ email })
      const userTasks = await taskRepository.findBy({ userId: user.id })
      return userTasks
    },
    async getTaskById(_, { id }, { req }) {
      const email = await auth(req)
      const task = await taskRepository.findOneBy({ id })
      if(!task) return null

      const user = await userRepository.findOneBy({ email })
      if(task.userId !== user.id) return null

      return task
    }
  },
  Mutation: {
    // delete task by id
    // return the deleted task
    async deleteTaskById(_, args, { req }) {
      const email = await auth(req)
      const task = await taskRepository.findOneBy({ id: args.id })
      if(!task) return null
      
      const user = await userRepository.findOneBy({ email })
      if(task.userId !== user.id) return null
      
      await taskRepository.delete(task.id)
      return task
    },
    // update task by id
    // return the updated task
    async updateTaskById(_, args, { req }) {
      const email = await auth(req)
      const task = await taskRepository.findOneBy({ id: args.id })
      if(!task) return null

      const user = await userRepository.findOneBy({ email })
      if(task.userId !== user.userid) return null

      return await taskRepository.update(args.id, { ...args.updates })
    },
    
    // create a new user
    // return the created user
    async createTask(_, args, { req }) {
      const email = await auth(req)
      const user = await userRepository.findOneBy({ email })
      const newTask = {
        ...args.taskInfo,
        userId: user.id
      }
      const result = await taskRepository.save(newTask)

      return result
    }
  }
}