import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import {IProfile, RootStateI} from "../../interfaces/interfaces";

const initialState: IProfile = {
    id: nanoid(),
    name: ''
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        changeName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        }
    }
});

export const selectProfile = (state: RootStateI) => state.profile;
export const {changeName} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;