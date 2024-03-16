import { column, defineDb, defineTable } from 'astro:db';

// https://astro.build/db/config


const user = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    username: column.text({ unique: true }),
    hashed_password: column.text({})
  }
})

const session = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    expiresAt: column.number(),
    userId: column.text({ references: () => user.columns.id }),
  }
})

const Childs = defineTable({
  columns: {
    idUsers: column.number({ primaryKey: true, unique: true }),
    firstName: column.text(),
  }
})

export default defineDb({
  tables: { Childs, user, session }
});


