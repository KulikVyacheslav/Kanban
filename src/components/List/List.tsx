import React, {useState} from 'react';
import {nanoid} from 'nanoid'
import './List.scss'
import {Card} from '../Card'
import {ToggleAddButton} from "../../interfaces/interfaces";

interface ListProps {
    list: {
        title: string,
        id: string,
        cards: []
    },
    onAddBtnClick(id: string | null): void,
    toggleAddCardForm: ToggleAddButton,
    addNewCard(idList: string, idCard: string, titleCard: string): void
}

export const List: React.FC<ListProps> = (props) => {
    const {list, onAddBtnClick, toggleAddCardForm, addNewCard} = props

    const [titleCards, setTitleCards] = useState<string>('')

    const handlerBtnAdd = (event: React.MouseEvent<HTMLButtonElement>):void => {
        event.stopPropagation()
        onAddBtnClick(event.currentTarget.id)
    }

    const handlerBtnAddToList = (event: React.MouseEvent<HTMLButtonElement>):void => {
        event.preventDefault()
        addNewCard(list.id, nanoid(), titleCards)
        onAddBtnClick(null)
    }

    const handlerInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitleCards(prevState => event.target.value)
    }

    return (

        <div className='list list_margin-right'>
            <div onClick={(event:React.MouseEvent<HTMLDivElement>) => event.stopPropagation()} className="list__wrapper list_bgc_gray">
                <div className="list__title">
                    <p>{list.title}</p>
                </div>
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
                                        onChange={handlerInputTitle}
                                    />
                                </div>
                                <button id={list.id} onClick={handlerBtnAddToList} className="btn btn-primary">Add card</button>
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
