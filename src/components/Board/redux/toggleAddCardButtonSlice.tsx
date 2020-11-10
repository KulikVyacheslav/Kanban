import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import {RootStateI, ToggleAddButton} from "../../../interfaces/interfaces";

const initialState: ToggleAddButton = {
    id: null,
    state: false
};

const toggleAddCardButtonSlice = createSlice({
    name: 'toggleAddCardButton',
    initialState,
    reducers: {
        changeToggle: (state, action: PayloadAction<ToggleAddButton>) => {
            state.state = action.payload.state;
            state.id = action.payload.id;
        }

    }
});

export const selectToogle = (state: RootStateI) => state.toggleAddCardButton;
export const {changeToggle} = toggleAddCardButtonSlice.actions;
export default toggleAddCardButtonSlice.reducer;