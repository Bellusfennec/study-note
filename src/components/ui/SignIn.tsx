import { Button, Fieldset, Flex, PasswordInput, TextInput, UnstyledButton } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSearchParams } from "react-router-dom";
import { UserSignIn } from "../../types";

const initialValues = {
  email: "",
  password: "",
};

export const SignIn = (props: UserSignIn) => {
  const { onSubmit } = props;
  const form = useForm({ initialValues });

  const [, setParams] = useSearchParams();

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <Fieldset legend="SignIn">
        <Flex gap="md" direction="column">
          <TextInput type="email" label="Email" placeholder="Email" {...form.getInputProps("email")} />
          <PasswordInput label="Пароль" placeholder="Пароль" {...form.getInputProps("password")} />
          <Button type="submit">Войти</Button>
          <Flex justify="center">
            <UnstyledButton onClick={() => setParams({ page: "registration" })}>Регистрация</UnstyledButton>
          </Flex>
        </Flex>
      </Fieldset>
    </form>
  );
};
