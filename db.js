import Database from 'better-sqlite3';

import fs from 'fs';

const dbPath = process.env.NODE_ENV === 'test' ? ':memory:  ' : 'macky-merch.db';
const db = new Database(dbPath);

const schema = fs.readFileSync('schema.sql', 'utf-8');

db.exec(schema);

export default db;