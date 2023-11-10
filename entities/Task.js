import { EntitySchema } from 'typeorm'

export const TaskEntity = new EntitySchema({
  name: 'Task',
  tableName: 'tasks',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    content: {
      type: 'varchar'
    },
    complete: {
      type: 'bool'
    },
    userId: {
      type: 'int'
    }
  }
})