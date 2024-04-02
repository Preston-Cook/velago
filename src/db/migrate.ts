import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function main() {
  // eslint-disable-next-line
  console.log('starting migration...');
  await migrate(db, { migrationsFolder: './drizzle' });
  // eslint-disable-next-line
  console.log('migration succeeded :)');
  await pool.end();
  process.exit(0);
}

main().catch((err) => {
  // eslint-disable-next-line
  console.log(err.message);
  process.exit(0);
});
