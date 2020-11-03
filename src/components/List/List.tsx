import React, {useState, useCallback} from 'react';
import {nanoid} from 'nanoid';
import './List.scss';
import {RenderCards, ToggleAddButton, ToggleTitleList, ILists, ICards, IComments } from "../../interfaces/interfaces";

interface ListProps {
    list: ILists,
    cards: Array<ICards>,
    comments: Array<IComments>,
    onAddBtnClick(id: string | null): void,
    onChTitleClick(id: string | null): void,
    toggleAddCardForm: ToggleAddButton,
    toggleTitleList: ToggleTitleList,
    addNewCard(idList: string, idCard: string, titleCard: string): void,
    changeTitleList(idList: string, titleList: string): void,
    render: RenderCards
}

export const List: React.FC<ListProps> = ({
                                              list,
                                              cards,
                                              comments,
                                              onAddBtnClick,
                                              onChTitleClick,
                                              toggleAddCardForm,
                                              addNewCard,
                                              toggleTitleList,
                                              changeTitleList,
                                              render
                                          }) => {

    const [titleCards, setTitleCards] = useState<string>('');
    const [titleLists, setTitleLists] = useState<string>(list.title);

    const handlerBtnAdd = useCallback((event: React.MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation();
        onAddBtnClick(event.currentTarget.id);
    }, [onAddBtnClick]);

    const handlerTitleList = useCallback((event: React.MouseEvent<HTMLDivElement>): void => {
        console.log(list.id);
        event.stopPropagation();
        onChTitleClick(list.id);
    }, [list.id, onChTitleClick]);

    const handlerBtnAddToList = useCallback((event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        addNewCard(list.id, nanoid(), titleCards);
        onAddBtnClick(null);
    }, [addNewCard, onAddBtnClick, list.id, titleCards]);

    const handlerInputTitleCards = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTitleCards(prevState => event.target.value);
    }, []);

    const handlerInputTitleLists = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setTitleLists(prevState => event.target.value);
        changeTitleList(list.id, event.target.value);
    }, [list.id, changeTitleList]);

    const handlerStopPropagation = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    }, []);

    const handlerOnSubmitForm = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }, []);

    const handlerSaveOnEnter = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        (event.key === 'Enter' && onChTitleClick(null));
    }, [onChTitleClick]);

    return (

        <div className="list list_margin-right">
            <div onClick={handlerStopPropagation}
                 className="list__wrapper list_bgc_gray">
                {toggleTitleList.state && list.id === toggleTitleList.id ? (
                    <div>
                        <form onSubmit={handlerOnSubmitForm}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Enter a title for this list..."
                                    onChange={handlerInputTitleLists}
                                    onKeyUp={handlerSaveOnEnter}
                                    value={titleLists}
                                />
                            </div>
                        </form>
                    </div>
                ) : (
                    <div className="list__title" onClick={handlerTitleList}>
                        <p>{list.title}</p>
                    </div>
                )}

                <div className="list__cards">
                    {(cards.length > 0 &&
                        cards.map((card: any) => {
                        const commentsCurrentCard: Array<IComments> = comments.filter( comments => comments.idCard === card.id);
                        // return <Card comments={commentsCurrentCard} key={card.id} card={card}/>;
                            return render(commentsCurrentCard, card.id, card);
                    }))
                    }
                </div>

                {toggleAddCardForm.state && list.id === toggleAddCardForm.id ? (
                    <div className="list__from">
                        <form>
                            <textarea
                                placeholder="Enter a title for this card..."
                                onChange={handlerInputTitleCards}
                            />
                            <button id={list.id} onClick={handlerBtnAddToList} className="btn btn-primary">Add card
                            </button>
                        </form>
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
