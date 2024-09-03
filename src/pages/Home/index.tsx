/* eslint-disable react-hooks/exhaustive-deps */
import { AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import NavControl from "../../components/ui/NavControl";
import { Sidebar } from "../../components/ui/Sidebar";
import { Workspace } from "../../components/ui/Workspace";

export const Home = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <>
      <AppShell
        header={{ height: 60 }}
        navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <h1>Notes</h1>
            <NavControl />
          </Group>
        </AppShell.Header>
        <AppShell.Navbar p="md">
          <AppShell.Section>Список заметок</AppShell.Section>
          <Sidebar />
        </AppShell.Navbar>
        <AppShell.Main>
          <Workspace />
        </AppShell.Main>
      </AppShell>
    </>
  );
};
