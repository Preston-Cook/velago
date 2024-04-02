import {
  pgTable,
  pgEnum,
  bigint,
  timestamp,
  varchar,
  text,
} from 'drizzle-orm/pg-core';

export const keyStatus = pgEnum('key_status', [
  'expired',
  'invalid',
  'valid',
  'default',
]);
export const keyType = pgEnum('key_type', [
  'stream_xchacha20',
  'secretstream',
  'secretbox',
  'kdf',
  'generichash',
  'shorthash',
  'auth',
  'hmacsha256',
  'hmacsha512',
  'aead-det',
  'aead-ietf',
]);
export const factorStatus = pgEnum('factor_status', ['verified', 'unverified']);
export const factorType = pgEnum('factor_type', ['webauthn', 'totp']);
export const aalLevel = pgEnum('aal_level', ['aal3', 'aal2', 'aal1']);
export const codeChallengeMethod = pgEnum('code_challenge_method', [
  'plain',
  's256',
]);

export const contacts = pgTable('contacts', {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  id: bigint('id', { mode: 'number' }).primaryKey().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  firstName: varchar('first-name').notNull(),
  lastName: varchar('last-name').notNull(),
  email: varchar('email').notNull(),
  phone: varchar('phone').notNull(),
  message: text('message'),
});
