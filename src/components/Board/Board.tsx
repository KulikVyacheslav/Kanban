import React, {useState, useCallback} from 'react';
import {List} from '../List';
import './Board.scss';
import {ToggleAddButton, ToggleTitleList} from "../../interfaces/interfaces";
import { ILists, ICards, IComments} from '../Layout/Layout';

interface BoardProps {
    lists: Array<ILists>,
    cards: Array<ICards>,
    comments: Array<IComments>,
    addNewCard(idList: string, idCard: string, titleCard: string): void,
    changeTitleList(idList: string, titleList: string): void
}


export const Board: React.FC<BoardProps> = ({ lists, cards, comments,  addNewCard, changeTitleList }) => {


    const [toggleAddCardForm, setToggleAddCardForm] = useState<ToggleAddButton>({
        state: false,
        id: null
    });

    const [toggleTitleList, setToggleTitleList] = useState<ToggleTitleList>({
        state: false,
        id: null
    });


    const resetStateToggleUniversal = useCallback((toggleSet: React.Dispatch<React.SetStateAction<ToggleTitleList>>, toggleTarget: ToggleAddButton): void => {
        if (toggleTarget.state) {
            toggleSet({
                state: false,
                id: null
            });
        }
    }, []);

    const resetStateToggle = useCallback((id: string | null): void => {
        resetStateToggleUniversal(setToggleAddCardForm, toggleAddCardForm);
        resetStateToggleUniversal(setToggleTitleList, toggleTitleList);
    }, [resetStateToggleUniversal, setToggleAddCardForm, toggleAddCardForm, setToggleTitleList, toggleTitleList]);


    const toggleHandlerUniversal = useCallback((id: string | null, toggleTarget: ToggleAddButton, toggleSet: React.Dispatch<React.SetStateAction<ToggleTitleList>>): void => {
        if (id !== toggleTarget.id && toggleTarget.id !== null) {
            toggleSet(prevState => {
                return {
                    ...prevState,
                    id
                };
            });
        } else {
            toggleSet(prevState => {
                return {
                    state: !prevState.state,
                    id
                };
            });
        }
        if (id === null) {
            resetStateToggleUniversal(toggleSet, toggleTarget);
        }
    }, [resetStateToggleUniversal]);

    const toggleHandlerAddButton = useCallback((id: string | null): void => {
        toggleHandlerUniversal(id, toggleAddCardForm, setToggleAddCardForm);
    }, [toggleHandlerUniversal, toggleAddCardForm, setToggleAddCardForm]);

    const toggleHandlerTitleList = useCallback((id: string | null): void => {
        toggleHandlerUniversal(id, toggleTitleList, setToggleTitleList);
    }, [toggleHandlerUniversal, toggleTitleList, setToggleTitleList]);

    const handlerResetState = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        resetStateToggle(event.currentTarget.className);
    }, [resetStateToggle]);

    return (
        <div onClick={handlerResetState}
             className="board">
            {lists.map((list: any) => {

                const cardsCurrentList: any = cards.filter( (card) => card.idList === list.id);

                    return <List
                        changeTitleList={changeTitleList}
                        addNewCard={addNewCard}
                        toggleAddCardForm={toggleAddCardForm}
                        toggleTitleList={toggleTitleList}
                        onChTitleClick={toggleHandlerTitleList}
                        onAddBtnClick={toggleHandlerAddButton}
                        key={list.id}
                        list={list}
                        cards={cardsCurrentList}
                        comments={comments}
                    />;
                })
            }

        </div>
    );
};
