import { AppShell, ScrollArea, Skeleton } from "@mantine/core";
import { useNote } from "../../../contexts/NoteProvider";
import { ListItem } from "../ListItem";

export const Sidebar = () => {
  const { noteList, createNote } = useNote();

  if (noteList.length === 0) {
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
      <ListItem note={{ id: "0", title: "Новая заметка", content: "", updatedAt: "" }} onClick={createNote} />
      {noteList.map((note) => (
        <ListItem key={note.id} note={note} />
      ))}
    </AppShell.Section>
  );
};
