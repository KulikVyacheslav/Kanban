import React, {useState, useCallback} from 'react';
import './Board.scss';
import {ToggleAddButton, ToggleTitleList, RenderLists, ILists, ICards } from "../../interfaces/interfaces";
import {IDBoardState} from "../../types/types";

interface BoardProps {
    lists: Array<ILists>,
    cards: Array<ICards>,
    render: RenderLists
}


export const Board: React.FC<BoardProps> = ({ lists, cards, render }) => {


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

    const resetStateToggle = useCallback((id: IDBoardState): void => {
        resetStateToggleUniversal(setToggleAddCardForm, toggleAddCardForm);
        resetStateToggleUniversal(setToggleTitleList, toggleTitleList);
    }, [resetStateToggleUniversal, setToggleAddCardForm, toggleAddCardForm, setToggleTitleList, toggleTitleList]);


    const toggleHandlerUniversal = useCallback((id: IDBoardState, toggleTarget: ToggleAddButton, toggleSet: React.Dispatch<React.SetStateAction<ToggleTitleList>>): void => {
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

    const toggleHandlerAddButton = useCallback((id: IDBoardState): void => {
        toggleHandlerUniversal(id, toggleAddCardForm, setToggleAddCardForm);
    }, [toggleHandlerUniversal, toggleAddCardForm, setToggleAddCardForm]);

    const toggleHandlerTitleList = useCallback((id: IDBoardState): void => {
        toggleHandlerUniversal(id, toggleTitleList, setToggleTitleList);
    }, [toggleHandlerUniversal, toggleTitleList, setToggleTitleList]);

    const handlerResetState = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        resetStateToggle(event.currentTarget.className);
    }, [resetStateToggle]);

    return (
        <div onClick={handlerResetState}
             className="board">
            {lists.map((list: any) => {

                const cardsCurrentList: Array<ICards> = cards.filter( (card) => card.idList === list.id);
                    // return <List
                    //     changeTitleList={changeTitleList}
                    //     addNewCard={addNewCard}
                    //     toggleAddCardForm={toggleAddCardForm}
                    //     toggleTitleList={toggleTitleList}
                    //     onChTitleClick={toggleHandlerTitleList}
                    //     onAddBtnClick={toggleHandlerAddButton}
                    //     key={list.id}
                    //     list={list}
                    //     cards={cardsCurrentList}
                    //     comments={comments}
                    // />;
                return render(toggleAddCardForm, toggleTitleList, toggleHandlerTitleList, toggleHandlerAddButton, list.id, list, cardsCurrentList);
                })
            }
        </div>
    );
};
