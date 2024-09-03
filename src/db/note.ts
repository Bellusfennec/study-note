import noteList from "../mocks/notes.json";
import { NoteDB, db } from "./index";

export async function populate() {
  await db.notes
    .bulkAdd(noteList)
    .then(function (lastKey) {
      console.log("All notes added successfully. Last key:", lastKey);
    })
    .catch(NoteDB.BulkError, function (e) {
      console.error("Some notes did not succeed. Error:", e);
    });
}
