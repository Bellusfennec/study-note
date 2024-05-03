import { Button, Flex, TextInput } from "@mantine/core";
import { useAuth } from "../../../contexts/AuthProvider";
import { useNote } from "../../../contexts/NoteProvider";

const NavControl = () => {
  const { isEditMode, setEditMode, setSearchText, searchText } = useNote();
  const { signOut } = useAuth();

  return (
    <Flex gap={10} justify="space-between">
      <Flex gap={10}>
        <Button onClick={() => setEditMode((state) => !state)}>{isEditMode ? "Просмотр" : "Редактировать"}</Button>
        <Button>Удалить</Button>
        {/* <Button onClick={() => db.delete()}>Удалить все в БД</Button> */}
        <TextInput value={searchText} placeholder="Найти" onChange={(e) => setSearchText(e.target.value)} />
      </Flex>
      <Button onClick={signOut}>Выйти</Button>
    </Flex>
  );
};

export default NavControl;
