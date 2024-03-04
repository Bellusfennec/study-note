import { Container, Flex } from "@mantine/core";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { SignIn } from "../../components/ui/SignIn";
import { SignUp } from "../../components/ui/SignUp";
import { useAuth } from "../../contexts/AuthProvider";
// import { use } from "marked";

export const Auth = () => {
  const [params] = useSearchParams();
  const page = params.get("page") === "login" || params.get("page") === "registration" ? params.get("page") : "login";
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const auth = useAuth();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlerSubmit = (data: any) => {
    if (auth && auth?.signIn) {
      auth?.signIn(data, () => {
        navigate(from, { replace: true });
      });
    }
  };

  return (
    <Flex mih="100vh" miw="100%" justify="center" align="center">
      <Container size="md" w="440px">
        {page === "login" && <SignIn onSubmit={handlerSubmit} />}
        {page === "registration" && <SignUp onSubmit={handlerSubmit} />}
      </Container>
    </Flex>
  );
};
