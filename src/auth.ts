import { SvelteKitAuth } from "@auth/sveltekit";
import Google from "@auth/sveltekit/providers/google";
import { db } from "$lib/server/db";
import { users } from "$lib/server/schema";
import { eq } from "drizzle-orm";

export const { handle } = SvelteKitAuth({
  providers: [Google],
  trustHost: true,
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email || !account?.provider) {
        return false;
      }

      // Check if user exists in database
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email))
        .limit(1);

      if (existingUser.length === 0) {
        // Create new user in database
        await db.insert(users).values({
          email: user.email,
          provider: account.provider,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        // Update the updatedAt timestamp on login
        await db
          .update(users)
          .set({ updatedAt: new Date() })
          .where(eq(users.email, user.email));
      }

      return true;
    },
    async session({ session }) {
      // Add user id from database to session
      if (session.user?.email) {
        const dbUser = await db
          .select()
          .from(users)
          .where(eq(users.email, session.user.email))
          .limit(1);

        if (dbUser.length > 0) {
          session.user.id = String(dbUser[0].id);
        }
      }
      return session;
    },
  },
});
