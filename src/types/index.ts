export interface UserSignIn {
  onSubmit: (event: any) => void;
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
