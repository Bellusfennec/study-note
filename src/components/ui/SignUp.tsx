import {
  Button,
  Fieldset,
  Flex,
  Group,
  Radio,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSearchParams } from "react-router-dom";
import { UserSignIn } from "../../types";

export const SignUp = (props: UserSignIn) => {
  const { onSubmit } = props;
  const form = useForm({
    initialValues: {
      name: "",
      nickName: "",
      email: "",
      sex: "",
      password: "",
      passwordRepeat: "",
    },
  });
  const [, setParams] = useSearchParams();

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <Fieldset legend="SignUp">
        <Flex gap="md" direction="column">
          <TextInput label="Имя" name="name" />
          <TextInput
            label="Ник"
            name="nickName"
            leftSection={<p style={{ color: "grey" }}>@</p>}
          />
          <TextInput type="email" label="Email" name="email" />
          <Radio.Group label="Пол" name="sex">
            <Group mt="xs">
              <Radio value="male" label="Мужской" />
              <Radio value="female" label="Женский" />
            </Group>
          </Radio.Group>
          <TextInput label="Пароль" />
          <TextInput label="Повторите пароль" />
          <Button type="submit">Создать</Button>
          <Flex justify="center">
            <UnstyledButton onClick={() => setParams({ page: "login" })}>
              У меня есть аккаунт
            </UnstyledButton>
          </Flex>
        </Flex>
      </Fieldset>
    </form>
  );
};
