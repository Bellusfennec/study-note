import { AppShell, ScrollArea, Skeleton } from "@mantine/core";
import { useNote } from "../../../contexts/NoteProvider";
import { ListItem } from "../ListItem";
// import { db } from "../../../db";
// import { useLiveQuery } from "dexie-react-hooks";

export const Sidebar = () => {
  const { noteList, createNote, searchText } = useNote();
  // console.log("noteList", noteList);
  // const lists = useLiveQuery(() => db.notes.toArray());
  // console.log("lists", lists);

  if (noteList?.length === 0 && searchText !== "") {
    return <p>Ничего не найдено</p>;
  }

  if (noteList?.length === 0) {
    return (
      <>
        {Array(15)
          .fill(0)
          .map((_, index) => (
            <Skeleton key={index} h={28} mt="sm" animate={true} />
          ))}
      </>
    );
  }

  return (
    <AppShell.Section grow my="md" component={ScrollArea}>
      <ListItem note={{ id: 0, title: "Новая заметка", content: "", updatedAt: "" }} createNote={createNote} />
      {noteList?.map((note) => (
        <ListItem key={note.id} note={note} />
      ))}
    </AppShell.Section>
  );
};
