import { TextInput } from "@mantine/core";
import { useNote } from "../../../contexts/NoteProvider";

export const SearchBox = () => {
  const { setSearchText } = useNote();
  return <TextInput placeholder="Search" onChange={(e) => setSearchText(e.currentTarget.value)} />;
};
