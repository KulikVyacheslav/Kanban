import React, {useState, useCallback} from 'react';
import './List.scss';
import {changeListTitle, selectLists} from '../../ducks';
import {useDispatch, useSelector} from "react-redux";
import {changeToggle, selectToogle} from "../../ducks";
import {IDBoardState} from 'types/types';
import {addCard, selectCards} from 'ducks/Cards/cardsSlice';
import {Card} from "../Card";

interface ListProps {
    listId: string
}

export const List: React.FC<ListProps> = ({listId}) => {

    const [titleCards, setTitleCards] = useState<string>('');

    const dispatch = useDispatch();

    const lists = useSelector(selectLists);
    const list = lists.find(list => list.id === listId);

    const cards = useSelector(selectCards);
    const cardsCurrentCard = cards.filter(card => card.idList === listId);

    const toggleAddCardButton = useSelector(selectToogle);

    const toggleHandlerAddButton = useCallback((id: IDBoardState): void => {

        if (id !== toggleAddCardButton.id && toggleAddCardButton.id !== null) {
            dispatch(changeToggle({
                state: toggleAddCardButton.state,
                id
            }));
        } else {
            dispatch(changeToggle({
                state: !toggleAddCardButton.state,
                id
            }));
        }
        if (id === null) {
            dispatch(changeToggle({
                state: false,
                id: null
            }));
        }
    }, [toggleAddCardButton, dispatch]);

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
