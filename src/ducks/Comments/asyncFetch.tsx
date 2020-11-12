import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchAllComments = createAsyncThunk(
    'comments/fetchAllComments',
    async () => {
        const response = await fetch(`http://localhost:3005/comments`);
        if (response.ok) {
            return await response.json();
        } else {
            return response.statusText;
        }
    }
);

export const fetchCommentById = createAsyncThunk(
    'comments/fetchCommentById',
    async (commentId: string) => {
        const response = await fetch(`http://localhost:3005/comments/${commentId}`);
        if (response.ok) {
            return await response.json();
        } else {
            return response.statusText;
        }
    }
);