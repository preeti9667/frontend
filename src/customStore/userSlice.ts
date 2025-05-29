// store/notesSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL = 'http://localhost:4000/diet/';

interface Entry {
  _id: string;
  time: string;
  text: any;
}

interface DateEntry {
  date: string;
  entries: Entry[];
}

interface NotesState {
  notes: DateEntry[];
  loading: boolean;
  error: string | null;
}

interface DietState {
  userDoc: any;
  loading: boolean;
  error: string | null;
}

const initialState: DietState = {
  userDoc: null,
  loading: false,
  error: null,
};

export const fetchDiet = createAsyncThunk(
  "diet/fetchDiet",
  async (userId: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/${userId}`);
      return res.data.userDoc;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addDiet = createAsyncThunk(
  "diet/addDiet",
  async ({ userId, date, time, text }: { userId: string; date: string; time: string; text: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/${userId}/${date}`, { time, text });
      return res.data.userDoc;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateDiet = createAsyncThunk(
  "diet/updateDiet",
  async ({ userId, date, id, time, text }: { userId: string; date: string; id: string; time: string; text: string }, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/${userId}/${date}/${id}`, { time, text });
      return res.data.userDoc;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteDiet = createAsyncThunk(
  "diet/deleteDiet",
  async ({ userId, date, id }: { userId: string; date: string; id: string }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(`${BASE_URL}/${userId}/${date}/${id}`);
      return res.data.userDoc;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);


const dietSlice = createSlice({
  name: "diet",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchDiet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiet.fulfilled, (state, action) => {
        state.loading = false;
        state.userDoc = action.payload;
      })
      .addCase(fetchDiet.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload?.error || "Fetch failed";
      })

      // Add
      .addCase(addDiet.fulfilled, (state, action) => {
        state.userDoc = action.payload;
      })

      // Update
      .addCase(updateDiet.fulfilled, (state, action) => {
        state.userDoc = action.payload;
      })

      // Delete
      .addCase(deleteDiet.fulfilled, (state, action) => {
        state.userDoc = action.payload;
      });
  },
});

export default dietSlice.reducer;

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
//       action: PayloadAction<{ date: string; index: number }>
//     ) => {
//       const { date, index } = action.payload;
//       if (state[date]) {
//         state[date].splice(index, 1);
//         saveToLocalStorage(state);
//       }
//     },
//   },
// });

// export const { addNote, removeNote } = notesSlice.actions;
// export default notesSlice.reducer;

