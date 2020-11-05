import React, {useState, useCallback} from 'react';
import {nanoid} from 'nanoid';
import './List.scss';
import {RenderCards, ToggleAddButton, ILists, ICards, IComments} from "../../interfaces/interfaces";

interface ListProps {
    list: ILists,
    cards: Array<ICards>,
    comments: Array<IComments>,
    onAddBtnClick(id: string | null): void,
    toggleAddCardForm: ToggleAddButton,
    addNewCard(idList: string, idCard: string, titleCard: string): void,
    changeTitleList(idList: string, titleList: string): void,
    render: RenderCards
}

export const List: React.FC<ListProps> = ({
                                              list,
                                              cards,
                                              comments,
                                              onAddBtnClick,
                                              toggleAddCardForm,
                                              addNewCard,
                                              changeTitleList,
                                              render
                                          }) => {

    const [titleCards, setTitleCards] = useState<string>('');


    const handlerBtnAdd = useCallback((event: React.MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        onAddBtnClick(event.currentTarget.id);
    }, [onAddBtnClick]);

    const handlerTitleList = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        changeTitleList(list.id, event.currentTarget.value);

    }, [list.id, changeTitleList]);


    const handlerBtnAddToList = useCallback((event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        addNewCard(list.id, nanoid(), titleCards);
    }, [addNewCard, list.id, titleCards]);

    const handlerInputTitleCards = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitleCards(event.target.value);
    }, []);


    const handlerEnterKey = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addNewCard(list.id, nanoid(), event.currentTarget.value);
            event.currentTarget.value = '';
        }
    }, [addNewCard, list.id]);


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
                        value={list.title}
                        onChange={handlerTitleList}
                    />
                </div>

                <div className="list__cards">
                    {(cards.length > 0 &&
                        cards.map((card: any) => {
                            const commentsCurrentCard: Array<IComments> = comments.filter(comments => comments.idCard === card.id);
                            return render(commentsCurrentCard, card.id, card);
                        }))
                    }
                </div>
                {toggleAddCardForm.state && list.id === toggleAddCardForm.id ? (
                    <div className="list__from">
                        <textarea
                                className="list__from-input"
                                placeholder="Enter a title for this card..."
                                onKeyDown={handlerEnterKey}
                                onChange={handlerInputTitleCards}
                        />
                        <button onClick={handlerBtnAddToList} className="btn btn-primary">Add card
                        </button>
                    </div>
                ) : (
                    <div className="list__add-card">
                        <button id={list.id} className="btn btn-light" onClick={handlerBtnAdd}>Add another card
                        </button>
                    </div>
                )}
            </div>
        </div>

    );
};
