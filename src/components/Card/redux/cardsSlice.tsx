import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import {ICards, RootStateI} from "../../../interfaces/interfaces";

const initialState: Array<ICards> = [
    {
        id: 'asdas213sad',
        idList: 'adc123s',
        title: 'Test card',
        description: 'Test desc'
    },
    {
        id: 'asdas213sadasd',
        idList: 'adc123s',
        title: 'Test card 2',
        description: 'Test desc'
    },
    {
        id: 'asdas213sadaas',
        idList: 'adc123s123',
        title: 'Test card 2',
        description: 'Test desc'
    }
];

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        addNewCard: {
            reducer(state, action: PayloadAction<ICards>) {
                console.log(action.payload);
                state.push(action.payload);
            },
            prepare(idList, title) {
                return {
                    payload: {
                        id: nanoid(),
                        idList,
                        title,
                        description: ''
                    }
                };
            }
        }
    }
});

export const selectCards = (state: RootStateI) => state.cards;
export const {addNewCard} = cardsSlice.actions;
export default cardsSlice.reducer;