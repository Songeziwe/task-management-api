import { AuthenticationError } from "apollo-server-errors"
import jwt from 'jsonwebtoken'

export const auth = async (req) => {
  let authHeader = null
  try {
    authHeader = req.headers.authorization
  } catch {
    throw new Error('Please attach the token on the request header')
  }

  if(authHeader) {
    const userToken = authHeader.split('Bear')[1].trim()
    if(userToken) {
      try {
        const { email } = jwt.verify(userToken, 'UNSAFE_STRING')
        return email
      } catch {
        throw new AuthenticationError('Invalid/Expired token')
      }
    }
    else throw new Error('Authentication token must be Bear [token]')
  } 
  else throw new Error('Authentication header must be provided')
}