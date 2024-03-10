export interface UserSignIn {
  onSubmit: (event: any) => void;
}
export interface ObjectData {
  [key: string]: string;
}
export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}
