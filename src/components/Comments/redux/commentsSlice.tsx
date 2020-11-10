import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import {IComments} from "../../../interfaces/interfaces";

const initialState: Array<IComments> = [
    {
        author: 'WebDev',
        id: 'dasdasd123213saasd',
        idCard: 'asdas213sad',
        text: 'Test comments'
    },
    {
        author: 'WebDev',
        id: 'dasdasdasd12asda',
        idCard: 'asdas213sad',
        text: 'Test comments 2'
    }
];

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {

    }
});

export const {} = commentsSlice.actions;
export default commentsSlice.reducer;