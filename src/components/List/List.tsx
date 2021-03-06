import React, {useState, useCallback, SetStateAction, Dispatch} from 'react';
import './List.scss';
import {changeListTitle, selectCardByListId, selectList} from '../../ducks';
import {useDispatch, useSelector} from "react-redux";
import {IDBoardState} from 'types/types';
import {addCard} from 'ducks/Cards/cardsSlice';
import {Card} from "../Card";
import {RootStateI, ToggleAddButton} from "../../interfaces/interfaces";

interface ListProps {
    listId: string,
    toggleAddCardButton: ToggleAddButton,
    setToggleAddCardButton: Dispatch<SetStateAction<ToggleAddButton>>

}

export const List: React.FC<ListProps> = ({listId, toggleAddCardButton, setToggleAddCardButton}) => {

    const [titleCards, setTitleCards] = useState<string>('');

    const dispatch = useDispatch();

    const list = useSelector((state: RootStateI) => selectList(state, listId));
    const cardsCurrentCard = useSelector((state: RootStateI) => selectCardByListId(state, listId));

    const toggleHandlerAddButton = useCallback((id: IDBoardState): void => {

        if (id !== toggleAddCardButton.id && toggleAddCardButton.id !== null) {
            setToggleAddCardButton(state => {
                return {
                    state: state.state,
                        id
                };
            });
        } else {
            setToggleAddCardButton(state => {
                return {
                    state: !state.state,
                    id
                };
            });
        }
        if (id === null) {
            setToggleAddCardButton({
                state: false,
                id: null
            });
        }
    }, [setToggleAddCardButton, toggleAddCardButton.id]);

    const handlerBtnAdd = useCallback((event: React.MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        toggleHandlerAddButton(list?.id);
    }, [toggleHandlerAddButton, list?.id]);

    const handlerTitleList = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch(changeListTitle(list?.id as string, event.currentTarget.value));
    }, [dispatch, list?.id]);


    const handlerBtnAddToList = useCallback((event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        dispatch(addCard(list?.id, titleCards));
        setTitleCards('');
    }, [dispatch, list?.id, titleCards]);

    const handlerInputTitleCards = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitleCards(event.target.value);
    }, []);


    const handlerEnterKey = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            dispatch(addCard(list?.id, titleCards));
            event.currentTarget.value = '';
            setTitleCards('');
        }
    }, [dispatch, titleCards, list?.id]);


    const handlerStopPropagation = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    }, []);


    return (

        <div className="list list_margin-right">
            <div onClick={handlerStopPropagation}
                 className="list__wrapper list_bgc_gray">
                <div className="list__title">
                    <input
                        className="list__title-field list_bgc_gray"
                        value={list?.title}
                        onChange={handlerTitleList}
                    />
                </div>

                <div className="list__cards">
                    {(cardsCurrentCard.length > 0 &&
                        cardsCurrentCard.map(card => <Card key={card.id} cardId={card.id}/>)
                    )}
                </div>
                {toggleAddCardButton.state && listId === toggleAddCardButton.id ? (
                    <div className="list__from">
                        <textarea
                            className="list__from-input"
                            placeholder="Enter a title for this card..."
                            onKeyDown={handlerEnterKey}
                            onChange={handlerInputTitleCards}
                            value={titleCards}
                        />
                        <button onClick={handlerBtnAddToList} className="btn btn-primary">Add card
                        </button>
                    </div>
                ) : (
                    <div className="list__add-card">
                        <button id={listId} className="btn btn-light" onClick={handlerBtnAdd}>Add another card
                        </button>
                    </div>
                )}
            </div>
        </div>

    );
};
