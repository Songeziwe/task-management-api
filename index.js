import 'reflect-metadata'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './schema.js'
import { resolvers } from './resolvers.js'
import { DataSource } from 'typeorm'
import { TaskEntity } from './entities/Task.js'
import 'dotenv/config'


const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [TaskEntity],
    synchronize: true,
    logging: false,
})

AppDataSource
  .initialize()
  .then(() => {
      // here you can start to work with your database
      console.log('Interact with the database')
  })
  .catch((error) => console.log(error))


// server setup
const server = new ApolloServer({
  // typeDefs - definitions of types of data
  typeDefs,
  // resolvers - handle incoming requests and return data to the client
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 }
})

console.log('Server ready at port 3000')