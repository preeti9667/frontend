import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Note {
   text: string,
   time: string, 
  }


// Helper functions for localStorage
const LOCAL_STORAGE_KEY = "notesData";

const saveToLocalStorage = (notes: Note[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
};

const loadFromLocalStorage = (): Note[] => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  }
  return [];
};

// Initial state
const initialState: Note[] = [];

const userSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    add(state, action: PayloadAction<Note>) {
      state.push(action.payload);
      saveToLocalStorage(state);
    },
    remove(state, action: PayloadAction<Note>) {
      const updatedState = state.filter((note) => note !== action.payload);
      saveToLocalStorage(updatedState);
      return updatedState;
    },
   
    load(state) {
      const loaded = loadFromLocalStorage();
      return loaded;
    },
  },
});

export const { add, remove, load,} = userSlice.actions;
export default userSlice.reducer;


// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface Note {
//   text: string;
//   time: string;
// }

// interface NotesState {
//   [date: string]: Note[];
// }

// const LOCAL_STORAGE_KEY = "notesData";

// const saveToLocalStorage = (notes: NotesState) => {
//   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
// };

// const loadFromLocalStorage = (): NotesState => {
//   if (typeof window !== "undefined") {
//     const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
//     if (stored) {
//       return JSON.parse(stored);
//     }
//   }
//   return {};
// };

// const initialState: NotesState = loadFromLocalStorage();

// const notesSlice = createSlice({
//   name: "notes",
//   initialState,
//   reducers: {
//     addNote: (
//       state,
//       action: PayloadAction<{ date: string; note: Note }>
//     ) => {
//       const { date, note } = action.payload;
//       if (!state[date]) {
//         state[date] = [];
//       }
//       state[date].push(note);
//       saveToLocalStorage(state);
//     },

//     removeNote: (
//       state,
//       action: PayloadAction<{ date: string; noteIndex: number }>
//     ) => {
//       const { date, noteIndex } = action.payload;
//       if (state[date]) {
//         state[date].splice(noteIndex, 1);
//         if (state[date].length === 0) {
//           delete state[date];
//         }
//       }
//       saveToLocalStorage(state);
//     },

//     loadNotes(state) {
//       return loadFromLocalStorage();
//     },
//   },
// });

// export const { addNote, removeNote, loadNotes } = notesSlice.actions;
// export default notesSlice.reducer;
