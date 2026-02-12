import { pgTable, serial, text, boolean, integer, primaryKey, timestamp } from 'drizzle-orm/pg-core';

// 1. Books Catalog (Manually added by you)
export const books = pgTable('books', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  type: text('type').default('novel'),
  engTitle: text('eng_title'),
  year: integer('year').notNull(),
  coverUrl: text('cover_url'),
  engCoverUrl: text('eng_cover_url'),
  synopsis: text('synopsis'),
  engSynopsis: text('eng_synopsis'),
  onlyEnglish: boolean('only_english').default(false),
  onlySpanish: boolean('only_spanish').default(false),
});

// 2. Users Table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  provider: text('provider').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 3. The Join Table (User <-> Books)
// This tracks which user owns/read which book
export const userBooks = pgTable('user_books', {
  userId: integer('user_id').references(() => users.id).notNull(),
  bookId: integer('book_id').references(() => books.id).notNull(),
  isOwned: boolean('is_owned').default(false),
  isRead: boolean('is_read').default(false),
  rating: integer('rating'), // 1-5 stars
}, (t) => [
  // Composite Primary Key: A user can't have the same book twice in this list
  primaryKey({ columns: [t.userId, t.bookId] }),
]);