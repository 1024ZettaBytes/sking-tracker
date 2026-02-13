import { db } from '$lib/server/db';
import { books } from '$lib/server/schema';
import { asc, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth();
  const language = session?.user?.language || 'ENG';

  // Fetch books based on language
  const allBooks = await db
    .select()
    .from(books)
    .where(language === 'ES' ? eq(books.onlyEnglish, false) : eq(books.onlySpanish, false))
    .orderBy(asc(books.year));

  const localizedBooks = allBooks.map(book => ({
    ...book,
    title: language === 'ES' && book.title ? book.title : (book.engTitle || book.title),
    coverUrl: language === 'ES' && book.coverUrl ? book.coverUrl : (book.engCoverUrl || book.coverUrl),
    synopsis: language === 'ES' && book.synopsis ? book.synopsis : (book.engSynopsis || book.synopsis),
  }));

  return {
    books: localizedBooks,
    session,
  };
};
