import Dexie, { Table } from "dexie";
import { populate } from "./note";
import { Note, User } from "../types";

export class NoteDB extends Dexie {
  notes!: Table<Note>;
  users!: Table<User>;

  constructor() {
    super("database");
    this.version(1).stores({
      notes: "++id, title, content",
      users: "++id, email, password",
    });
  }
}

export const db = new NoteDB();

db.on("populate", populate);
