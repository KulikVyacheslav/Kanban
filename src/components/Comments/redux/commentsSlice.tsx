import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import {IComments, RootStateI} from "../../../interfaces/interfaces";

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
        addNewComment: {
            reducer(state, action: PayloadAction<IComments>) {
                state.push(action.payload);
            },
            prepare(idCard: string, text: string, author: string) {
                return {
                    payload: {
                        author,
                        id: nanoid(),
                        idCard,
                        text
                    }
                };
            }
        }
    }
});

export const selectComments = (state: RootStateI) => state.comments;
export const {addNewComment} = commentsSlice.actions;
export default commentsSlice.reducer;