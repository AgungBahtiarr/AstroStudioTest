import { column, defineDb, defineTable } from 'astro:db';

// https://astro.build/db/config

const Users = defineTable({
  columns: {
    idUsers: column.number({ primaryKey: true, unique: true }),
    firstName: column.text(),
  }
})

export default defineDb({
  tables: { Users }
});


