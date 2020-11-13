import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import {ILists, RootStateI} from '../../interfaces/interfaces';



const initialState: Array<ILists> = [{
    title: 'TODO',
    id: 'adc123s',
},
    {
        title: 'In Progress',
        id: 'adc123s123',
    },
    {
        title: 'Testing',
        id: nanoid(),
    },
    {
        title: 'Done',
        id: nanoid(),
    }];

const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        addList: {
            reducer(state, action: PayloadAction<ILists>) {
                state.push(action.payload);
            },
             prepare(title: string) {
                return {
                    payload: {
                        id: nanoid(),
                        title
                    }
                };
             }
        },
        deleteList: (state, action: PayloadAction<string>) => {
            state = state.filter( list => list.id !== action.payload);
            //TODO
        },
        changeListTitle: {
            reducer(state, action: PayloadAction<ILists>) {
                const {id, title} = action.payload;
                const indList = state.findIndex(list => list.id === id);
                state[indList].title = title;
            },
            prepare(idList: string, title: string) {
                return {
                    payload: {
                        id: idList,
                        title
                    }
                };
            }
        },
    },
});

export const selectLists = (state: RootStateI) => state.lists;

export const { addList, deleteList, changeListTitle } = listSlice.actions;
export const listReducer =  listSlice.reducer;