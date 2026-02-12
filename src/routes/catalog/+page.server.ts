// src/routes/catalog/+page.server.ts
import { db } from '$lib/server/db';
import { books } from '$lib/server/schema';
import { asc } from 'drizzle-orm';

export const load = async () => {
  const allBooks = await db.select().from(books).orderBy(asc(books.year));

  return {
    books: allBooks,
  };
};
