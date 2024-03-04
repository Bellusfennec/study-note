import React, { createContext, useContext, useState } from "react";

type User = null | string;
interface AuthContextValue {
  user: User;
  signIn?: SignIn;
  signOut?: SignOut;
}
interface AuthProviderProps {
  children: React.ReactNode;
}
interface SignIn {
  (name: string, callback?: () => void): void;
}
interface SignOut {
  (callback?: () => void): void;
}

const AuthContext = createContext<AuthContextValue>({ user: null });

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = (props: AuthProviderProps) => {
  const { children } = props;
  const [user, setUser] = useState<User>(() => localStorage.getItem("user") || null);

  const signIn: SignIn = (name, callback) => {
    setUser(name);
    localStorage.setItem("user", name);
    callback?.();
  };
  const signOut: SignOut = (callback) => {
    setUser(null);
    localStorage.removeItem("user");
    callback?.();
  };

  const value = {
    user,
    signIn,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
