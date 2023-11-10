import 'reflect-metadata'
import 'dotenv/config'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './schemas/schema.js'
import { resolvers } from './resolvers/resolvers.js'
import { connectToDB } from './dbConfig.js'

try {
  await connectToDB()
  console.log('DB connected successfully!')
} catch(e) {
  console.log('DB Error:', e.message)
  process.exit(1)
}

// server setup
const server = new ApolloServer({
  // typeDefs - definitions of types of data
  typeDefs,
  // resolvers - handle incoming requests and return data to the client
  resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: process.env.PORT }
})

console.log(`Server ready at port ${process.env.PORT}`)