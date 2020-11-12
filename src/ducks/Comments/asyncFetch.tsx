import {createAsyncThunk} from "@reduxjs/toolkit";
import {IComments} from "../../interfaces/interfaces";

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
    async (commentId: string, thunkApi) => {
        const response = await fetch(`http://localhost:3005/comments/${commentId}`);
        if (response.ok) {
            return await response.json();
        } else {
            return thunkApi.rejectWithValue(response.statusText);
        }
    }
);

export const fetchAddNewComment = createAsyncThunk(
    'comments/fetchAddNewComment',
    async (commentParams: IComments, thunkApi) => {
        const response = await fetch(`http://localhost:3005/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(commentParams)
        });
        if (response.ok) {
            return await response.json();
        } else {
            return thunkApi.rejectWithValue(response.statusText);
        }
    }
);

export const fetchDeleteCommentById = createAsyncThunk(
    'comments/fetchDeleteCommentById',
    async (commentId: string, thunkApi) => {
        const response = await fetch(`http://localhost:3005/comments/${commentId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            return await response.json();
        } else {
            return thunkApi.rejectWithValue(response.statusText);
        }
    }
);

export const fetchChangeCommentById = createAsyncThunk<
    IComments,
    IComments
    >(
    'comments/fetchChangeCommentById',
    async (commentParams, thunkApi) => {
        const response = await fetch(`http://localhost:3005/comments/${commentParams.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(commentParams)
        });
        if (response.ok) {
            return await response.json();
        } else {
            return thunkApi.rejectWithValue(response.statusText);
        }
    }
);