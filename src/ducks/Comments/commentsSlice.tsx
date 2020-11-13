import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IComments, ICommentsState, RootStateI} from "../../interfaces/interfaces";
import {
    addComment,
    getAllComments,
    changeCommentById,
    getCommentById,
    deleteCommentById
} from "./asyncFetch";




const initialState: ICommentsState = {

    comments: [],
    loading: false,
    error: {}


};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        // addNewComment: {
        //     reducer(state, action: PayloadAction<IComments>) {
        //         state.comments.push(action.payload);
        //     },
        //     prepare(idCard: string, text: string, author: string) {
        //         return {
        //             payload: {
        //                 author,
        //                 id: nanoid(),
        //                 idCard,
        //                 text
        //             }
        //         };
        //     }
        // },
        // deleteComment: (state, action: PayloadAction<string>) => {
        //     const indComment = state.comments.findIndex(comment => comment.id === action.payload );
        //     state.comments.splice(indComment, 1);
        // },
        // changeCommentText: (state, action: PayloadAction<{ id: string, text: string }>) => {
        //     const {id, text} = action.payload;
        //     const indComment = state.comments.findIndex(comment => comment.id === id );
        //     state.comments[indComment].text = text;
        // }
    },
    extraReducers: {
        [getCommentById.pending.type]: (state, action: PayloadAction) => {
            console.log(action);
            state.loading = true;
        },
        [getCommentById.fulfilled.type]: (state) => {
            state.loading = false;
        },
        [getCommentById.rejected.type]: (state, action: PayloadAction<object>) => {
            state.loading = false;
            state.error = action.payload;
        },

        [getAllComments.pending.type]: (state) => {
            state.loading = true;
        },
        [getAllComments.fulfilled.type]: (state, action: PayloadAction<IComments[]>) => {
            state.loading = false;
            state.comments = [...action.payload];

        },
        [getAllComments.rejected.type]: (state, action: PayloadAction<object>) => {
            state.loading = false;
            state.error = action.payload;
        },

        [addComment.pending.type]: (state, action) => {
            state.comments.push(action.meta.arg);
            state.loading = true;
        },
        [addComment.fulfilled.type]: (state) => {
            state.loading = false;
        },
        [addComment.rejected.type]: (state, action) => {
            state.loading = false;
            state.comments.pop();
            state.error = action.error;
        },

        [deleteCommentById.pending.type]: (state) => {
            state.loading = true;
        },
        [deleteCommentById.fulfilled.type]: (state, action) => {
            const indComment = state.comments.findIndex(comment => comment.id === action.payload );
            state.comments.splice(indComment, 1);
            state.loading = false;
        },
        [deleteCommentById.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        },

        [changeCommentById.pending.type]: (state) => {
            state.loading = true;
        },
        [changeCommentById.fulfilled.type]: (state, action) => {
            const {id, text} = action.payload;
            const indComment = state.comments.findIndex(comment => comment.id === id );
            state.comments[indComment].text = text;
        },
        [changeCommentById.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.error;
        }
    }
});

export const selectComments = (state: RootStateI) => state.comments.comments;
//export const {} = commentsSlice.actions;
export const commentsReducer =  commentsSlice.reducer;