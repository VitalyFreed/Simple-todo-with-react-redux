import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {client} from '../../api/client';

const initialState = [];

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const users = await client('https://jsonplaceholder.typicode.com/users');
    return users;
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.fulfilled]: (state, action) => {
            return action.payload;
        }
    }
});

export default usersSlice.reducer;

export const selectAllUsers = state => state.users;

export const selectUserById = (state, userId) => state.users.find(user => user.id === Number(userId));