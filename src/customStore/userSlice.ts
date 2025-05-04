// store/notesSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Note {
  text: string;
  time: string;
}

interface NotesState {
  [date: string]: Note[];
}

const LOCAL_STORAGE_KEY = "notesDataByDate";

const saveToLocalStorage = (data: NotesState) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  }
};

const loadFromLocalStorage = (): NotesState => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  }
  return {};
};

const initialState: NotesState = loadFromLocalStorage();

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    addNote: (
      state,
      action: PayloadAction<{ date: string; note: Note }>
    ) => {
      const { date, note } = action.payload;
      if (!state[date]) {
        state[date] = [];
      }
      state[date].push(note);
      saveToLocalStorage(state);
    },
    removeNote: (
      state,
      action: PayloadAction<{ date: string; index: number }>
    ) => {
      const { date, index } = action.payload;
      if (state[date]) {
        state[date].splice(index, 1);
        saveToLocalStorage(state);
      }
    },
  },
});

export const { addNote, removeNote } = notesSlice.actions;
export default notesSlice.reducer;

