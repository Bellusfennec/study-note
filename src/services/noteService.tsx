// import { TodoCreate, TodoUpdate } from "../types";
import httpService from "./httpService";

const noteEndPoint = "note/";

const noteService = {
  get: async () => {
    const { data } = await httpService.get(noteEndPoint);
    return data;
  },
  create: async (payload: any) => {
    const { data } = await httpService.post(noteEndPoint, payload);
    return data;
  },
  update: async (payload: any) => {
    const { data } = await httpService.patch(noteEndPoint + payload._id, payload);
    return data;
  },
  delete: async (id: string) => {
    const { data } = await httpService.delete(noteEndPoint + id);
    return data;
  },
};

export default noteService;
