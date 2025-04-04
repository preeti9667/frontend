import { createSlice, PayloadAction} from "@reduxjs/toolkit";

interface User {
    id: string;
    fullName: string;
    email: string;
    userId: string;
    isActive: boolean;
}

// interface UserState {
//     users: User[];
//     loading: boolean;
//     error: string | null;
//   }

//   const  initialState: UserState = {
//     users: [],
//     loading: false,
//     error: null,
//   };

const initialState: User[] = [];


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUsers: (_state, action: PayloadAction<User[]>) => action.payload, // Store fetched users
    addUser: (state, action: PayloadAction<User>) => {
      state.push(action.payload); // Add new user
       }
    },
});

export const {setUsers, addUser} = userSlice.actions;
export default userSlice.reducer;