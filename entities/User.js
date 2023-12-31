import { EntitySchema } from 'typeorm'

export const UserEntity = new EntitySchema({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    name: {
      type: 'varchar'
    },
    surname: {
      type: 'varchar'
    },
    email: {
      type: 'varchar'
    },
    password: {
      type: 'varchar'
    },
    token: {
      type: 'varchar'
    }
  }
})