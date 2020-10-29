import React, {useState} from 'react';
import {nanoid} from 'nanoid'
import './List.scss'
import {Card} from '../Card'
import {ToggleAddButton, ToggleTitleList} from "../../interfaces/interfaces";
import {log} from "util";

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

export const List: React.FC<ListProps> = (props) => {
    const {list, onAddBtnClick, onChTitleClick, toggleAddCardForm, addNewCard, toggleTitleList, changeTitleList} = props

    const [titleCards, setTitleCards] = useState<string>('')
    const [titleLists, setTitleLists] = useState<string>(list.title)

    const handlerBtnAdd = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.stopPropagation()
        onAddBtnClick(event.currentTarget.id)
    }

    const handlerTitleList = (event: React.MouseEvent<HTMLDivElement>): void => {
        console.log(list.id)
        event.stopPropagation()
        onChTitleClick(list.id)
    }

    const handlerBtnAddToList = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault()
        addNewCard(list.id, nanoid(), titleCards)
        onAddBtnClick(null)
    }

    const handlerInputTitleCards = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleCards(prevState => event.target.value)
    }

    const handlerInputTitleLists = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setTitleLists(prevState => event.target.value)
        changeTitleList(list.id, event.target.value)
    }

    return (

        <div className='list list_margin-right'>
            <div onClick={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}
                 className="list__wrapper list_bgc_gray">
                {
                    toggleTitleList.state && list.id === toggleTitleList.id
                        ? <div>
                            <form onSubmit={(event) => event.preventDefault()}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder='Enter a title for this list...'
                                        onChange={handlerInputTitleLists}
                                        onKeyUp={(event) => {(event.key === 'Enter' && onChTitleClick(null))}}
                                        value={titleLists}
                                    />
                                </div>
                            </form>
                        </div>
                        : <div className="list__title" onClick={handlerTitleList}>
                            <p>{list.title}</p>
                        </div>
                }

                <div className="list__cards">
                    {
                        list.cards.map((card: any) => {
                            return <Card key={card.id} card={card}/>
                        })
                    }
                </div>
                {
                    toggleAddCardForm.state && list.id === toggleAddCardForm.id
                        ? <div>
                            <form>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder='Enter a title for this card...'
                                        onChange={handlerInputTitleCards}
                                    />
                                </div>
                                <button id={list.id} onClick={handlerBtnAddToList} className="btn btn-primary">Add card
                                </button>
                            </form>
                        </div>
                        : <div className="list__add-card">
                            <button id={list.id} onClick={handlerBtnAdd}>Add another card
                            </button>
                        </div>
                }
            </div>
        </div>
    )
}
