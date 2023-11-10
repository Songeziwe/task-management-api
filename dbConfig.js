import { DataSource } from 'typeorm'
import { TaskEntity } from './entities/Task.js'

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [TaskEntity],
  synchronize: true,
  logging: false,
})

export const connectToDB = async () => {
  try {
    await AppDataSource.initialize()
  } catch(e) {
    throw new Error(e.message)
}
}