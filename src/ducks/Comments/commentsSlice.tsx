import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import {IComments, ICommentsState, RootStateI} from "../../interfaces/interfaces";
import {fetchAllComments, fetchCommentById} from "./asyncFetch";




const initialState: ICommentsState = {

    comments: [
        // {
        //     author: 'WebDev',
        //     id: 'dasdasd123213saasd',
        //     idCard: 'asdas213sad',
        //     text: 'Test comments'
        // },
        // {
        //     author: 'WebDev',
        //     id: 'dasdasdasd12asda',
        //     idCard: 'asdas213sad',
        //     text: 'Test comments 2'
        // }
    ],
    loading: false,
    error: {}


};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addNewComment: {
            reducer(state, action: PayloadAction<IComments>) {
                state.comments.push(action.payload);
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
            const indComment = state.comments.findIndex(comment => comment.id === action.payload );
            state.comments.splice(indComment, 1);
        },
        changeCommentText: (state, action: PayloadAction<{ id: string, text: string }>) => {
            const {id, text} = action.payload;
            const indComment = state.comments.findIndex(comment => comment.id === id );
            state.comments[indComment].text = text;
        }
    },
    extraReducers: {
        [fetchCommentById.pending.type]: (state, action: PayloadAction) => {
            console.log(action);
            state.loading = true;
        },
        [fetchCommentById.fulfilled.type]: (state) => {
            state.loading = false;
        },
        [fetchCommentById.rejected.type]: (state, action: PayloadAction<IComments>) => {
            state.loading = false;
            state.error = action.payload;
        },

        [fetchAllComments.pending.type]: (state) => {
            state.loading = true;
        },
        [fetchAllComments.fulfilled.type]: (state, action: PayloadAction<IComments[]>) => {
            console.log(action.payload);
            state.loading = false;
            state.comments = [...action.payload];

        },
        [fetchAllComments.rejected.type]: (state, action: PayloadAction<IComments>) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const selectComments = (state: RootStateI) => state.comments.comments;
export const {addNewComment, deleteComment, changeCommentText} = commentsSlice.actions;
export const commentsReducer =  commentsSlice.reducer;