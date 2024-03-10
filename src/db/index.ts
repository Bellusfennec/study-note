import Dexie, { Table } from "dexie";

export interface Note {
  id?: number;
  title: string;
  content: number;
}

export class MySubClassedDexie extends Dexie {
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

export const db = new MySubClassedDexie();
