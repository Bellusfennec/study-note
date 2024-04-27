import React, { createContext, MouseEventHandler, useContext, useEffect, useState } from "react";
import { db } from "../db";
// import { use } from "marked";

type User = null | string;
interface AuthContextValue {
  user: User;
  signIn?: SignIn;
  signOut?: MouseEventHandler<HTMLButtonElement>;
  isAuth: boolean;
  isLoading: boolean;
}
interface AuthProviderProps {
  children: React.ReactNode;
}
interface SignIn {
  (data: DataSignIn, callback?: () => void): void;
}
interface SignOut {
  (callback?: (e: MouseEventHandler<HTMLButtonElement>) => void): void;
}
export interface DataSignIn {
  email: string;
  password: string;
}

const AuthContext = createContext<AuthContextValue>({ user: null, isAuth: false, isLoading: true });

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [isLoading, setLoading] = useState(true);
  const [isAuth, setAuth] = useState<boolean>(false);
  const [user, setUser] = useState<User>(null);

  const signIn: SignIn = (data, callback) => {
    db.users.add(data).then((id) => {
      if (typeof id === "number") {
        setUser(data.email);
        localStorage.setItem("user", data.email);
        setAuth(true);
        callback?.();
      }
    });
  };
  const signOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    setAuth(false);
  };

  const getUser = async () => {
    setLoading(true);
    const email = localStorage.getItem("user");
    if (typeof email === "string") {
      await db.users.get({ email }).then((user) => {
        if (user) {
          setUser(user.email);
          setAuth(true);
          return user.email;
        }
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  const value = {
    user,
    signIn,
    signOut,
    isAuth,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
