import { Button, Flex } from "@mantine/core";
import { useNote } from "../../../contexts/NoteProvider";

const NavControl = () => {
  const { isEditMode, setEditMode } = useNote();

  return (
    <Flex gap={10}>
      <Button onClick={() => setEditMode((state) => !state)}>{isEditMode ? "Просмотр" : "Редактировать"}</Button>
      <Button>Удалить</Button>
    </Flex>
  );
};

export default NavControl;
