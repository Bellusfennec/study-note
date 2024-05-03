/* eslint-disable react-hooks/exhaustive-deps */
import { Space, TextInput, Textarea } from "@mantine/core";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";
import { useNote } from "../../../contexts/NoteProvider";
import { Note } from "../../../types";
import { db } from "../../../db";
import React, { useEffect, useState } from "react";

export const Workspace = () => {
  const { noteList, setNoteList, isEditMode, selectedNoteId } = useNote();
  const currentNote = noteList.find((note) => note.id === selectedNoteId) || null;
  const [markup, setMarkup] = useState({ __html: "" });

  useEffect(() => {
    const fetchMarkup = async () => {
      const markupObject = await createMarkup();
      setMarkup(markupObject);
    };

    fetchMarkup();
  }, [currentNote]);

  const handlerChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.currentTarget;

    setNoteList((state) => {
      const index: number = state.findIndex((note) => note.id === selectedNoteId);
      const newState: Note[] = [...state];
      if (name === "title" || name === "content") newState[index][name] = value;
      newState[index].updatedAt = new Date().toISOString();
      db.notes.update(newState[index], newState[index]);
      return newState;
    });
  };

  async function createMarkup() {
    const html = await marked.parse(currentNote?.content || "");
    const content = DOMPurify.sanitize(html);
    return { __html: content };
  }

  if (!isEditMode && currentNote) {
    return (
      <>
        <h1>{currentNote?.title}</h1>
        {/* dangerouslySetInnerHTML особенность библиотеки, в примерах работы в react так и показывается */}
        {markup && <div dangerouslySetInnerHTML={markup} />}
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
