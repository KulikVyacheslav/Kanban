import {createSlice, Draft, nanoid, PayloadAction} from '@reduxjs/toolkit';
import {ILists, RootStateI} from '../../../interfaces/interfaces';
import {RootState} from "../../../store";


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
        removeList: (state, action: PayloadAction<string>) => {
            state = state.filter( list => list.id !== action.payload);
        },
        changeTitleList: {
            reducer(state, action: PayloadAction<ILists>) {

                const {id, title} = action.payload;
                state = state.map( list => {
                   if (list.id === id) {
                       return {
                           id,
                           title
                       };
                   }
                    return list;
                });
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

export const { addList, removeList, changeTitleList } = listSlice.actions;
export default listSlice.reducer;