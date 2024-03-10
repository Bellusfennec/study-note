import React, { useContext } from "react";
import notes from "../mocks/notes.json";
import { Note } from "../types";

interface NoteContextProps {
  noteList: Note[];
  setNoteList: React.Dispatch<React.SetStateAction<Note[]>>;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  createNote?: () => void;
  isEditMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  selectedNoteId?: string;
  setSelectedNoteId: React.Dispatch<React.SetStateAction<string | null>>;
}

const NoteContext = React.createContext({ noteList: [] } as { noteList: Note[] });

export const useNote = () => {
  return useContext(NoteContext) as NoteContextProps;
};

const NoteProvider = ({ children }: any) => {
  const [noteList, setNoteList] = React.useState<Note[]>(notes || []);
  const [searchText, setSearchText] = React.useState<string>("");
  const [isEditMode, setEditMode] = React.useState<boolean>(false);
  const [selectedNoteId, setSelectedNoteId] = React.useState<string | null>(null);
  const searchData = searchText
    ? noteList.filter((note) => note.content.toLowerCase().includes(searchText.toLowerCase()))
    : noteList;
  const sortedData = [...searchData].sort((a: any, b: any) => {
    const aa = +new Date(a.updatedAt).getTime();
    const bb = +new Date(b.updatedAt).getTime();
    return bb - aa;
  });

  const createNote = () => {
    let id = null as string | null;
    setNoteList((state) => {
      const filteredEmpty = state.filter((note) => !(note.title === "Новая заметка" && note.content === ""));
      id = (filteredEmpty.length + 1).toString();
      const newNote = { id, title: "Новая заметка", content: "", updatedAt: new Date().toISOString() };
      return [...filteredEmpty, newNote];
    });
    setSelectedNoteId(id);
    setEditMode(true);
  };

  const value = {
    noteList: sortedData,
    setNoteList,
    setSearchText,
    createNote,
    isEditMode,
    setEditMode,
    selectedNoteId,
    setSelectedNoteId,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

export default NoteProvider;
