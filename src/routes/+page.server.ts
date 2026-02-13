// src/routes/+page.server.ts
import { db } from '$lib/server/db';
import { books, users } from '$lib/server/schema';
import { desc, eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth();
  const language = session?.user?.language || 'ENG';

  // Fetch books based on language
  const booksData = await db
    .select()
    .from(books)
    .where(language === 'ES' ? eq(books.onlyEnglish, false) : eq(books.onlySpanish, false))
    .orderBy(desc(books.year))
    .limit(6);

  const featuredBooks = booksData.map(book => ({
    ...book,
    title: language === 'ES' && book.title ? book.title : (book.engTitle || book.title),
    coverUrl: language === 'ES' && book.coverUrl ? book.coverUrl : (book.engCoverUrl || book.coverUrl),
    synopsis: language === 'ES' && book.synopsis ? book.synopsis : (book.engSynopsis || book.synopsis),
  }));

  return {
    featuredBooks,
    session
  };
};

export const actions: Actions = {
  setLanguage: async ({ request, locals }) => {
    const session = await locals.auth();
    if (!session?.user?.email) return fail(401);

    const data = await request.formData();
    const language = data.get('language') as string;

    if (language !== 'ENG' && language !== 'ES') return fail(400);

    await db
      .update(users)
      .set({ language })
      .where(eq(users.email, session.user.email));

    return { success: true };
  }
};
