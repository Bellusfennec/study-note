/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import { useNote } from "../../contexts/NoteProvider";

interface AppLoaderProps {
  children: React.ReactNode;
}

export const AppLoader = (props: AppLoaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { children } = props;
  const { isAuth, isLoading } = useAuth();
  const { getNotes } = useNote();
  const isLocationAuthorization = location?.pathname === "/auth";

  useEffect(() => {
    if (!isLocationAuthorization && !isAuth) navigate("/auth");
    else if (isLocationAuthorization && isAuth) navigate("/");

    if (isAuth) getNotes();
  }, [isAuth]);

  // useEffect(() => {
  //   if (!isLocationAuthorization && !isAuth) navigate("/login");
  //   else if (isLocationAuthorization && isAuth) navigate("/");
  // });

  if (isLoading) {
    return <>Loading...</>;
  }

  return <>{children}</>;
};
