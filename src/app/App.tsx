import { MantineProvider } from "@mantine/core";
import { AppRoutes } from "./AppRoutes";
import AuthProvider from "../contexts/AuthProvider";
import NoteProvider from "../contexts/NoteProvider";
import { AppLoader } from "../components/hoc/AppLoader";

export function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <NoteProvider>
          <AppLoader>
            <AppRoutes />
          </AppLoader>
        </NoteProvider>
      </AuthProvider>
    </MantineProvider>
  );
}
