import Dexie, { Table } from "dexie";
import { populate } from "./note";

export interface Note {
  id?: number;
  title: string;
  content: string;
}

export class NoteDB extends Dexie {
  // 'friends' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  notes!: Table<Note>;

  constructor() {
    super("database");
    this.version(1).stores({
      notes: "++id, title, content", // Primary key and indexed props
    });
  }
}

export const db = new NoteDB();

export const initDataDB = () => {
  db.on("populate", populate);
};
