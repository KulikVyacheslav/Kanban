import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import {ToggleAddButton} from "../../../interfaces/interfaces";

const initialState: ToggleAddButton = {
    id: null,
    state: false
};

const toggleAddCardButtonSlice = createSlice({
    name: 'toggleAddCardButton',
    initialState,
    reducers: {

    }
});

export const {} = toggleAddCardButtonSlice.actions;
export default toggleAddCardButtonSlice.reducer;