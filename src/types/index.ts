import { DataSignIn } from "../contexts/AuthProvider";

export interface UserSignIn {
  onSubmit: (event: DataSignIn) => void;
}
export interface ObjectData {
  [key: string]: string;
}
export interface Note {
  id?: number;
  title: string;
  content: string;
  updatedAt: string;
}
export interface User {
  id?: number;
  email: string;
  password: string;
}
