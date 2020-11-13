import {createSlice, nanoid, PayloadAction} from '@reduxjs/toolkit';
import {ICards, RootStateI} from "../../interfaces/interfaces";

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
        addCard: {
            reducer(state, action: PayloadAction<ICards>) {
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
        },
        deleteCard: (state, action: PayloadAction<string>) => {
            const indCard = state.findIndex(card => card.id === action.payload);
            state.splice(indCard, 1);
        },
        changeCardTitle: (state, action: PayloadAction<{ id: string, title: string }>) => {
            const {id, title} = action.payload;
            const indCard = state.findIndex(card => card.id === id);
            state[indCard].title = title;
        },
        changeCardDescription: (state, action: PayloadAction<{ id: string, description: string }>) => {
            const {id, description} = action.payload;
            const indCard = state.findIndex(card => card.id === id);
            state[indCard].description = description;
        }
    }
});

export const selectCards = (state: RootStateI) => state.cards;
export const selectCardByCardId = (state: RootStateI, cardId: string) => state.cards.find( card => card.id === cardId);
export const selectCardByListId = (state: RootStateI, listId: string) => state.cards.filter( card => card.idList === listId);
export const {addCard, deleteCard, changeCardTitle, changeCardDescription} = cardsSlice.actions;
export const cardsReducer = cardsSlice.reducer;