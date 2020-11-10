import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import {IProfile, RootStateI} from "../../../interfaces/interfaces";

const initialState: IProfile = {
    id: nanoid(),
    name: ''
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

    }
});

export const selectProfile = (state: RootStateI) => state.profile;
export const {} = profileSlice.actions;
export default profileSlice.reducer;