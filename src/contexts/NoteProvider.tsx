import React, { useContext } from "react";
import { db } from "../db";
import { Note } from "../types";

interface NoteProviderProps {
  children: React.ReactNode;
}
interface NoteContextProps {
  noteList: Note[];
  setNoteList: React.Dispatch<React.SetStateAction<Note[]>>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  createNote?: () => void;
  isEditMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  selectedNoteId?: string;
  setSelectedNoteId: React.Dispatch<React.SetStateAction<number | null>>;
  getNotes: () => void;
}

const NoteContext = React.createContext({ noteList: [] } as { noteList: Note[] });

export const useNote = () => {
  return useContext(NoteContext) as NoteContextProps;
};

const NoteProvider = ({ children }: NoteProviderProps) => {
  const [noteList, setNoteList] = React.useState<Note[]>([]);
  const [searchText, setSearchText] = React.useState<string>("");
  const [isEditMode, setEditMode] = React.useState<boolean>(false);
  const [selectedNoteId, setSelectedNoteId] = React.useState<number | null>(null);
  const searchData = searchText
    ? noteList.filter((note) => note.content.toLowerCase().includes(searchText.toLowerCase()))
    : noteList;
  const sortedData = [...searchData].sort((a: Note, b: Note) => {
    const aa = +new Date(a.updatedAt).getTime();
    const bb = +new Date(b.updatedAt).getTime();
    return bb - aa;
  });

  const createNote = () => {
    const newNote = { title: "Новая заметка", content: "", updatedAt: new Date().toISOString() };
    db.notes.add(newNote).then((id) => {
      if (typeof id === "number") {
        setNoteList((state) => [...state, { id, ...newNote }]);
        setSelectedNoteId(id);
        setEditMode(true);
      }
    });
  };

  const getNotes = () => {
    db.notes
      .toArray()
      .then((data) => {
        setNoteList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const value = {
    noteList: sortedData,
    setNoteList,
    searchText,
    setSearchText,
    createNote,
    isEditMode,
    setEditMode,
    selectedNoteId,
    setSelectedNoteId,
    getNotes,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
};

export default NoteProvider;
