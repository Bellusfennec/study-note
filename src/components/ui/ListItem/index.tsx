import { Box, Divider, Group, Text, UnstyledButton } from "@mantine/core";
import { useNote } from "../../../contexts/NoteProvider";
import { Note } from "../../../types";
import { timePassed } from "../../../utils/displayDate";

interface ListItemProps {
  note: Note;
  createNote?: () => void;
}

export const ListItem = (props: ListItemProps) => {
  const { note, createNote } = props;
  const { setSelectedNoteId } = useNote();

  return (
    <Box w={250}>
      <UnstyledButton onClick={() => (createNote ? createNote() : setSelectedNoteId(note.id || null))}>
        <Box w={250}>
          <Text truncate="end">{note.title}</Text>
        </Box>
        <Box w={250}>
          <Group wrap="nowrap">
            <Text truncate="end">
              {timePassed(note.updatedAt)}
              <span style={{ color: "grey", paddingLeft: "1rem" }}>{note.content}</span>
            </Text>
          </Group>
        </Box>
      </UnstyledButton>
      <Divider my="xs" />
    </Box>
  );
};
