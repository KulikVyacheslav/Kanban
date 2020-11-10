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
        },
        deleteComment: (state, action: PayloadAction<string>) => {
            const indComment = state.findIndex(comment => comment.id === action.payload );
            state.splice(indComment, 1);
        },
        changeCommentText: (state, action: PayloadAction<{ id: string, text: string }>) => {
            const {id, text} = action.payload;
            const indComment = state.findIndex(comment => comment.id === id );
            state[indComment].text = text;
        }
    }
});

export const selectComments = (state: RootStateI) => state.comments;
export const {addNewComment, deleteComment, changeCommentText} = commentsSlice.actions;
export default commentsSlice.reducer;