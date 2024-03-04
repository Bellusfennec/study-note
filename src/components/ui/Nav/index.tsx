import { UnstyledButton } from "@mantine/core";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthProvider";
import "./style.css";

export const Nav = () => {
  const auth = useAuth();

  return (
    <nav className="nav__container">
      <Link to="/" className="nav__logo">
        Главная
      </Link>
      <div className="nav__menu">dds</div>
      {auth.user === null ? (
        <Link to="/auth">Войти</Link>
      ) : (
        <UnstyledButton onClick={() => auth?.signOut?.()}>Выйти</UnstyledButton>
      )}
    </nav>
  );
};
