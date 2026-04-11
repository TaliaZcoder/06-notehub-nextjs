import axios from "axios";
import type { Note } from "../types/note";

export type Note = {
  id: string;
  title: string;
  content: string;
  categoryId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type NoteListResponse = {
  notes: Note[];
  total: number;
};

axios.defaults.baseURL = "https://next-v1-notes-api.goit.study";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getNotes = async () => {
  await delay(2000);
  const res = await axios.get<NoteListResponse>('/notes');
  return res.data;
};

export const getSingleNote = async (id: string) => {
  const res = await axios.get<Note>(`/notes/${id}`);
  return res.data;
};


const BASE_URL = "https://notehub-public.goit.study/api";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  tag: Note["tag"];
}

export const fetchNotesById = async (
  page: number,
  search: string
): Promise<FetchNotesResponse> => {
  const res = await axios.get<FetchNotesResponse>(`${BASE_URL}/notes`, {
    params: {
      page,
      perPage: 12,
      search,
    },
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
    },
  });

  return res.data;
};

export const createNote = async (
  note: CreateNoteRequest
): Promise<Note> => {
  const res = await axios.post<Note>(`${BASE_URL}/notes`, note, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });

  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await axios.delete<Note>(`${BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });

  return res.data;
};