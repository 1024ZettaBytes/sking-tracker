
import postgres from 'postgres';
import * as dotenv from 'dotenv';
dotenv.config();

const sql = postgres(process.env.DATABASE_URL);

async function fix() {
  try {
    console.log('Fixing created_at...');
    await sql`
      ALTER TABLE users 
      ALTER COLUMN created_at TYPE timestamp with time zone 
      USING created_at::timestamp with time zone;
    `;
    console.log('Fixed created_at.');

    console.log('Fixing updated_at...');
    await sql`
      ALTER TABLE users 
      ALTER COLUMN updated_at TYPE timestamp with time zone 
      USING updated_at::timestamp with time zone;
    `;
    console.log('Fixed updated_at.');
  } catch (e) {
    console.error('Error fixing columns:', e);
  } finally {
    await sql.end();
  }
}

fix();
