// store/slices/dietSlice.ts
import { BASE_URL } from '@/constant';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import moment from 'moment';

const API_BASE = `${BASE_URL}/diet`;

interface Entry {
  _id?: string;
  time: string;
  text: string;
}

interface DateNote {
  _id?: string;
  userId: string;
  date: string;
  entries: Entry[];
}

interface DietState {
  notes: DateNote[];
  loading: boolean;
  error: string | null;
}

const initialState: DietState = {
  notes: [],
  loading: false,
  error: null,
};

// Fetch all diet entries for a user
export const fetchDiet = createAsyncThunk(
  'diet/fetchDiet',
  async (userId: string) => {
    const response = await axios.get(`${API_BASE}/${userId}`);
    return response.data.data; // returns an array of DateNotes
  }
);

// Add a new entry (creates new doc or adds entry to existing doc)
export const addDiet = createAsyncThunk(
  'diet/addDiet',
  async ({ userId, date, time, text }: { userId: string; date: string; time: string; text: string }) => {
    const response = await axios.post(`${API_BASE}/${userId}/${date}`, { time, text });
    return response.data.data; // single updated/created doc
  }
);

// Update an existing entry
export const updateDiet = createAsyncThunk(
  'diet/updateDiet',
  async ({ userId, date, time, text, _id}: { userId: string; date: string; time: string; text: string; _id: string}) => {
    const response = await axios.put(`${API_BASE}/${userId}/${date}/${_id}`, { text, time });
    return response.data.data; // updated doc
  }
);

// Delete entry or document
export const deleteDiet = createAsyncThunk(
  'diet/deleteDiet',
  async ({ userId, date,id }: { userId: string; date: string; id: string }) => {
    const response = await axios.delete(`${API_BASE}/${userId}/${date}/${id}`);
    // return response.data.data;
  }
);

const dietSlice = createSlice({
  name: 'diet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDiet.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchDiet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch diet';
      })

      .addCase(addDiet.fulfilled, (state, action) => {
        const newDoc = action.payload;
        const index = state.notes.findIndex(n => n.userId === newDoc.userId && n.date === newDoc.date);

        if (index !== -1) {
          state.notes[index] = newDoc; // update existing doc
        } else {
          state.notes.push(newDoc); // add new date entry
        }
      })

      .addCase(updateDiet.fulfilled, (state, action) => {
        const updatedDoc = action.payload;
        const index = state.notes.findIndex(n => n.userId === updatedDoc.userId && n.date === updatedDoc.date);
        if (index !== -1) {
          state.notes[index] = updatedDoc;
        }
      })
      .addCase(deleteDiet.fulfilled, (state, action) => {
      const { userId, date, id } = action.meta.arg;
      const formattedDate = moment(date).format('YYYY-MM-DD');
      // const note = state.notes.find(n => n.date === date);
        const note = state.notes.find((d) => d.userId === userId && d.date === formattedDate);
      if (note) {
        note.entries = note.entries.filter(entry => entry._id !== id);
      }
    });

  },
});

export default dietSlice.reducer;






