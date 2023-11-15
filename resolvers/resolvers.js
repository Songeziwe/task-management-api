import { AppDataSource } from '../dbConfig.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { ApolloError } from 'apollo-server-errors'
import { auth } from '../middleware/auth.js'

const taskRepository = AppDataSource.getRepository('Task')
const userRepository = AppDataSource.getRepository('User')

export const resolvers = {
  // Getters
  Query: {
    async tasks(_, args, ctx) {
      const email = await auth(ctx.req)
      const user = await userRepository.findOneBy({ email })
      const userTasks = await taskRepository.find({ userId: user.id })
      return userTasks
    },
    async users(_, args, ctx) {
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
    async updateTaskById(_, args) {
      await taskRepository.update(args.id, { ...args.updates })
      return await taskRepository.findOneBy({ id: args.id })
    },
    async signIn(_, { signInInput }) {
      // check if user exists
      const user = await userRepository.findOneBy({ email: signInInput.email })

      // throw error if the user does not exists
      if(!user) throw new ApolloError(`User doesn't exists with email ${signInInput.email}`, 'USER_DOES_NOT_EXISTS') 
    
      // compare passwords
      const correctPassword = await bcrypt.compare(signInInput.password, user.password)
      if(!correctPassword) throw new ApolloError('Incorrect email/password', 'INCORRECT_EMAIL_PASSWORD')
      
      // create jwt token and attach it to the user created above
      const token =  jwt.sign(
        { email: signInInput.email },
        'UNSAFE_STRING',
        { expiresIn: '2h' }
      )
      
      //  update user token on the database
      await userRepository.update(user.id, { token: token })
      return { ...user, token }
    },
    async signUp(_, {signUpInput}) {
      // check if user exists
      const user = userRepository.findOneBy({ email: signUpInput.email })
    
      // throw error if the user does exists
      if(!user) throw new ApolloError(`A user is already registered with the email ${signUpInput.email}`, 'USER_ALREADY_EXISTS') 
    
      // encrypt the password
      const encryptedPassword = await bcrypt.hash(signUpInput.password, 10)
    
      // build the user data to be saved to database
      const newUser = {
        name: signUpInput.name,
        surname: signUpInput.surname,
        email: signUpInput.email.toLowerCase(),
        password: encryptedPassword,
        token: null
      }
      // create jwt token and attach it to the user created above
      const token =  jwt.sign(
        { email: signUpInput.email },
        'UNSAFE_STRING',
        { expiresIn: '2h' }
      )
      newUser.token = token
      //  save user to the database
      return await userRepository.save(newUser)
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
    },
  },
  Task: {
    async user(parent) {
      return await userRepository.findOneBy({ id: parent.userId })
    }
  }
}