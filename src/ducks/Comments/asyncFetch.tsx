import {createAsyncThunk} from "@reduxjs/toolkit";
import {IComments} from "../../interfaces/interfaces";

export const getAllComments = createAsyncThunk(
    'comments/getAllComments',
    async () => {
        const response = await fetch(`http://localhost:3005/comments`);
        if (response.ok) {
            return await response.json();
        } else {
            return response.statusText;
        }
    }
);

export const getCommentById = createAsyncThunk(
    'comments/getCommentById',
    async (commentId: string, thunkApi) => {
        const response = await fetch(`http://localhost:3005/comments/${commentId}`);
        if (response.ok) {
            return await response.json();
        } else {
            return thunkApi.rejectWithValue(response.statusText);
        }
    }
);

export const addComment = createAsyncThunk(
    'comments/addComment',
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

export const deleteCommentById = createAsyncThunk(
    'comments/deleteCommentById',
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

export const changeCommentById = createAsyncThunk<
    IComments,
    IComments
    >(
    'comments/changeCommentById',
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