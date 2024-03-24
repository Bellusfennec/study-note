import { Box, Divider, Group, Text, UnstyledButton } from "@mantine/core";
import { useNote } from "../../../contexts/NoteProvider";
import { Note } from "../../../types";
import { timePassed } from "../../../utils/displayDate";

interface ListItemProps {
  note: Note;
  onClick?: () => void;
}

export const ListItem = (props: ListItemProps) => {
  const { note, onClick } = props;
  const { setSelectedNoteId, selectedNoteId } = useNote();
  // console.log(selectedNoteId, note.id, selectedNoteId === note.id, note.title);

  return (
    <Box w={250}>
      {/* @ts-ignore */}
      <UnstyledButton onClick={() => (onClick ? onClick() : setSelectedNoteId(note.id))}>
        {note.title} <br />
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
