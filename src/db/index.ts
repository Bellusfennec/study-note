import Dexie, { Table } from "dexie";
import { populate } from "./note";
import { Note, User } from "../types";

const NOTES_STORE_MASK = "++id, title, content";
const USER_STORE_MASK = "++id, email, password";

export class NoteDB extends Dexie {
  notes!: Table<Note>;
  users!: Table<User>;

  constructor() {
    super("database");
    this.version(1).stores({
      notes: NOTES_STORE_MASK,
      users: USER_STORE_MASK,
    });
  }
}

export const db = new NoteDB();

db.on("populate", populate);
