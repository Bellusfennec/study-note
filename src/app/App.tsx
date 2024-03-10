import { MantineProvider } from "@mantine/core";
import { AppRoutes } from "./AppRoutes";
import AuthProvider from "../contexts/AuthProvider";
import NoteProvider from "../contexts/NoteProvider";

export function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <NoteProvider>
          <AppRoutes />
        </NoteProvider>
      </AuthProvider>
    </MantineProvider>
  );
}
