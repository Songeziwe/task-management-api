import { AppDataSource } from '../dbConfig.js'
import { userResolver } from './userResolver.js'
import { taskResolver } from './taskResolver.js'

const userRepository = AppDataSource.getRepository('User')

export const resolvers = {
  // Getters
  Query: {
    ...userResolver.Query,
    ...taskResolver.Query,
  },
  // Mutators
  Mutation: {
    ...userResolver.Mutation,
    ...taskResolver.Mutation,
  },
  Task: {
    async user(parent) {
      return await userRepository.findOneBy({ id: parent.userId })
    }
  }
}