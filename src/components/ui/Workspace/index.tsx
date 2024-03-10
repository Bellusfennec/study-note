/* eslint-disable react-hooks/exhaustive-deps */
import { Space, TextInput, Textarea } from "@mantine/core";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { Note } from "../../../types";
import { useNote } from "../../../contexts/NoteProvider";
import React from "react";

export const Workspace = () => {
  const { noteList, setNoteList, isEditMode, selectedNoteId } = useNote();
  const currentNote = noteList.find((note) => note.id === selectedNoteId) || null;
  const content = marked.parse(currentNote?.content || "") || "";

  const handlerChange = (e: any) => {
    const { name, value } = e.currentTarget;
    setNoteList((state) => {
      const index = state.findIndex((note) => note.id === selectedNoteId);
      const newState: Note[] = [...state];
      if (name === "title") {
        newState[index].title = value;
      } else if (name === "content") {
        newState[index].content = value;
      }
      newState[index].updatedAt = new Date().toISOString();
      return newState;
    });
  };

  function createMarkup(html: any) {
    const content = DOMPurify.sanitize(html);
    return { __html: content };
  }

  if (!isEditMode && currentNote) {
    return (
      <>
        <h1>{currentNote?.title}</h1>
        <div dangerouslySetInnerHTML={createMarkup(content)} />
      </>
    );
  }

  return (
    <>
      <TextInput value={currentNote?.title || ""} name="title" placeholder="Заголовок" onChange={handlerChange} />
      <Space h="md" />
      <Textarea
        value={currentNote?.content || ""}
        name="content"
        placeholder="Текст"
        onChange={handlerChange}
        rows={7}
      />
    </>
  );
};
