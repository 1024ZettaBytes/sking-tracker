import { redirect, fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { books, userBooks, users } from '$lib/server/schema';
import { eq, and, asc } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth();
  if (!session?.user) {
    throw redirect(303, '/');
  }

  const userId = parseInt(session.user.id!);
  const language = session.user.language || 'ENG';

  const allBooks = await db
    .select()
    .from(books)
    .where(language === 'ES' ? eq(books.onlyEnglish, false) : eq(books.onlySpanish, false))
    .orderBy(asc(books.year));

  const userInteractions = await db
    .select()
    .from(userBooks)
    .where(eq(userBooks.userId, userId));
  const interactionMap = new Map(
    userInteractions.map((i) => [i.bookId, i])
  );

  const collection = allBooks.map((book) => {
    const interaction = interactionMap.get(book.id);
    return {
      ...book,
      title: language === 'ES' && book.title ? book.title : (book.engTitle || book.title),
      coverUrl: language === 'ES' && book.coverUrl ? book.coverUrl : (book.engCoverUrl || book.coverUrl),
      synopsis: language === 'ES' && book.synopsis ? book.synopsis : (book.engSynopsis || book.synopsis),
      isOwned: interaction?.isOwned ?? false,
      isRead: interaction?.isRead ?? false,
      rating: interaction?.rating ?? null,
    };
  });

  const stats = {
    total: allBooks.length,
    owned: collection.filter((b) => b.isOwned).length,
    read: collection.filter((b) => b.isRead).length,
  };

  return {
    collection,
    stats,
    user: session.user,
  };
};

export const actions: Actions = {
  toggleOwned: async ({ request, locals }) => {
    const session = await locals.auth();
    if (!session?.user) return fail(401);

    const data = await request.formData();
    const bookId = parseInt(data.get('bookId') as string);
    const userId = parseInt(session.user.id!);

    if (isNaN(bookId)) return fail(400);

    const existing = await db
      .select()
      .from(userBooks)
      .where(and(eq(userBooks.userId, userId), eq(userBooks.bookId, bookId)))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(userBooks)
        .set({ isOwned: !existing[0].isOwned })
        .where(and(eq(userBooks.userId, userId), eq(userBooks.bookId, bookId)));
    } else {
      await db.insert(userBooks).values({
        userId,
        bookId,
        isOwned: true,
        isRead: false,
      });
    }

    return { success: true };
  },

  toggleRead: async ({ request, locals }) => {
    const session = await locals.auth();
    if (!session?.user) return fail(401);

    const data = await request.formData();
    const bookId = parseInt(data.get('bookId') as string);
    const userId = parseInt(session.user.id!);

    if (isNaN(bookId)) return fail(400);

    const existing = await db
      .select()
      .from(userBooks)
      .where(and(eq(userBooks.userId, userId), eq(userBooks.bookId, bookId)))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(userBooks)
        .set({ isRead: !existing[0].isRead })
        .where(and(eq(userBooks.userId, userId), eq(userBooks.bookId, bookId)));
    } else {
      await db.insert(userBooks).values({
        userId,
        bookId,
        isOwned: false,
        isRead: true,
      });
    }

    return { success: true };
  },

  rateBook: async ({ request, locals }) => {
    const session = await locals.auth();
    if (!session?.user) return fail(401);

    const data = await request.formData();
    const bookId = parseInt(data.get('bookId') as string);
    const rating = parseInt(data.get('rating') as string);
    const userId = parseInt(session.user.id!);

    if (isNaN(bookId) || isNaN(rating) || rating < 1 || rating > 5) return fail(400);

    const existing = await db
      .select()
      .from(userBooks)
      .where(and(eq(userBooks.userId, userId), eq(userBooks.bookId, bookId)))
      .limit(1);

    if (existing.length > 0) {
      await db
        .update(userBooks)
        .set({ rating })
        .where(and(eq(userBooks.userId, userId), eq(userBooks.bookId, bookId)));
    } else {
      await db.insert(userBooks).values({
        userId,
        bookId,
        isOwned: false,
        isRead: false,
        rating,
      });
    }

    return { success: true };
  },
};
