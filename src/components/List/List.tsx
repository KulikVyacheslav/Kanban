import React, {useState, useCallback} from 'react';
import {nanoid} from 'nanoid'
import './List.scss'
import {Card} from '../Card'
import {ToggleAddButton, ToggleTitleList} from "../../interfaces/interfaces";

interface ListProps {
    list: {
        title: string,
        id: string,
        cards: []
    },
    onAddBtnClick(id: string | null): void,
    onChTitleClick(id: string | null): void,
    toggleAddCardForm: ToggleAddButton,
    toggleTitleList: ToggleTitleList,
    addNewCard(idList: string, idCard: string, titleCard: string): void,
    changeTitleList(idList: string, titleList: string): void
}

export const List: React.FC<ListProps> = ({
                                              list,
                                              onAddBtnClick,
                                              onChTitleClick,
                                              toggleAddCardForm,
                                              addNewCard,
                                              toggleTitleList,
                                              changeTitleList
                                          }) => {

    const [titleCards, setTitleCards] = useState<string>('')
    const [titleLists, setTitleLists] = useState<string>(list.title)

    const handlerBtnAdd = useCallback((event: React.MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation()
        onAddBtnClick(event.currentTarget.id)
    }, [onAddBtnClick])

    const handlerTitleList = useCallback((event: React.MouseEvent<HTMLDivElement>): void => {
        console.log(list.id)
        event.stopPropagation()
        onChTitleClick(list.id)
    }, [list.id, onChTitleClick])

    const handlerBtnAddToList = useCallback((event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault()
        addNewCard(list.id, nanoid(), titleCards)
        onAddBtnClick(null)
    }, [addNewCard, onAddBtnClick, list.id, titleCards])

    const handlerInputTitleCards = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleCards(prevState => event.target.value)
    }, [])

    const handlerInputTitleLists = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setTitleLists(prevState => event.target.value)
        changeTitleList(list.id, event.target.value)
    }, [list.id, changeTitleList])

    const handlerStopPropagation = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
    }, [])

    const handlerOnSubmitForm = useCallback((event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
    }, [])

    const handlerSaveOnEnter = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        (event.key === 'Enter' && onChTitleClick(null))
    }, [onChTitleClick])

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
                    {list.cards.map((card: any) => {
                        return <Card key={card.id} card={card}/>
                    })
                    }
                </div>

                {toggleAddCardForm.state && list.id === toggleAddCardForm.id ? (
                    <div>
                        <form>
                            <div className="form-group">
                                <input
                                    type="text"
                                    placeholder="Enter a title for this card..."
                                    onChange={handlerInputTitleCards}
                                />
                            </div>
                            <button id={list.id} onClick={handlerBtnAddToList} className="btn btn-primary">Add card
                            </button>
                        </form>
                    </div>
                ) : (
                    <div className="list__add-card">
                        <button id={list.id} onClick={handlerBtnAdd}>Add another card
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
