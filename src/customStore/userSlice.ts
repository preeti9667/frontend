// store/slices/dietSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE = 'http://localhost:4000/diet'; // adjust as needed

interface Entry {
  _id: string;
  time: string;
  text: string;
}

interface DateNote {
  date: string;
  entries: Entry[];
}

interface DietState {
  userId: string;
  notes: DateNote[];
  loading: boolean;
  error: string | null;
}

const initialState: DietState = {
  userId: '',
  notes: [],
  loading: false,
  error: null,
};

export const fetchDiet = createAsyncThunk(
  'diet/fetchDiet',
  async (userId: string) => {
    const response = await axios.get(`${API_BASE}/${userId}`);
    return response.data.userDoc;
  }
);

export const addDiet = createAsyncThunk(
  'diet/addDiet',
  async ({ userId, date, time, text }: { userId: string; date: string; time: string; text: string }) => {
    const response = await axios.post(`${API_BASE}/${userId}/${date}`, { time, text });
    return response.data.userDoc;
  }
);

export const updateDiet = createAsyncThunk(
  'diet/updateDiet',
  async ({ userId, date, id, time, text }: { userId: string; date: string; id: string; time: string; text: string }) => {
    const response = await axios.put(`/api/diet/${userId}/${date}/${id}`, { time, text });
    return response.data.userDoc;
  }
);

export const deleteDiet = createAsyncThunk(
  'diet/deleteDiet',
  async ({ userId, date, id }: { userId: string; date: string; id: string }) => {
    const response = await axios.delete(`/api/diet/${userId}/${date}/${id}`);
    return response.data.userDoc;
  }
);

const dietSlice = createSlice({
  name: 'diet',
  initialState: {
    loading: false,
    error: null as string | null,
    userDoc: null as any,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDiet.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDiet.fulfilled, (state, action) => {
        state.loading = false;
        state.userDoc = action.payload;
      })
      .addCase(fetchDiet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch diet';
      })

      .addCase(addDiet.fulfilled, (state, action) => {
        state.userDoc = action.payload;
      })

      .addCase(updateDiet.fulfilled, (state, action) => {
        state.userDoc = action.payload;
      })

      .addCase(deleteDiet.fulfilled, (state, action) => {
        state.userDoc = action.payload;
      });
  },
});
export default dietSlice.reducer;




