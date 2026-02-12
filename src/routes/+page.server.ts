// src/routes/+page.server.ts
import { db } from '$lib/server/db';
import { books } from '$lib/server/schema';
import { desc } from 'drizzle-orm';

export const load = async () => {
  const featuredBooks = await db.select().from(books).orderBy(desc(books.year)).limit(6);

  return {
    featuredBooks,
  };
};
