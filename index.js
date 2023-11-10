import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './schema.js'
import { resolvers } from './resolvers.js'

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