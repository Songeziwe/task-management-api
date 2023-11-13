import 'reflect-metadata'
import 'dotenv/config'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from '../schemas/schema.js'
import { resolvers } from '../resolvers/resolvers.js'
import { connectToDB } from '../dbConfig.js'
import { startServerAndCreateLambdaHandler, handlers } from '@as-integrations/aws-lambda'

try {
  await connectToDB()
  console.log('DB connected successfully!')
} catch(e) {
  console.log('DB Error:', e.message)
}

// server setup
const server = new ApolloServer({
  // typeDefs - definitions of types of data
  typeDefs,
  // resolvers - handle incoming requests and return data to the client
  resolvers
})

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler()
);

console.log(`Server ready at port ${process.env.PORT}`)