import { Database } from "bun:sqlite";

export const db = new Database(":memory:", { strict: true });

export function bootstrapDb() {
  db.run("drop table if exists subscription");
  db.prepare(
    `CREATE TABLE IF NOT EXISTS subscription (
      id TEXT,
      plan_id TEXT,
      user_id TEXT,
      start_date TEXT,
      renew_on TEXT,
      status TEXT
);`,
  ).run();
}
