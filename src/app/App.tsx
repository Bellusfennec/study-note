import { MantineProvider } from "@mantine/core";
import { AppRoutes } from "./AppRoutes";
import AuthProvider from "../contexts/AuthProvider";

export function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </MantineProvider>
  );
}
