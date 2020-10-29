import React, {useState} from 'react';
import {List} from '../List'
import './Board.scss'
import {ToggleAddButton} from "../../interfaces/interfaces";

interface BoardProps {
    lists: [],
    addNewCard(idList: string, idCard: string, titleCard: string): void
}


export const Board: React.FC<BoardProps> = (props) => {
    const {lists, addNewCard} = props

    const [toggleAddCardForm, setToggleAddCardForm] = useState<ToggleAddButton>({
        state: false,
        id: null
    })

    const toggleHandlerAddButton = (id: string | null):void => {
        if(id !== toggleAddCardForm.id  && toggleAddCardForm.id !== null) {
            setToggleAddCardForm(prevState => {
                return {
                    ...prevState,
                    id
                }
            })
        } else {
            setToggleAddCardForm(prevState => {
                return {
                    state: !prevState.state,
                    id
                }
            })
        }
        if (id === 'board' || id === null) {
            setToggleAddCardForm({
                state: false,
                id: null
            })
        }

    }

    return (
         <div onClick={(event:React.MouseEvent<HTMLDivElement>) => toggleHandlerAddButton(event.currentTarget.id)} className='board' id='board'>
            {
                lists.map((list: any) => {
                    return <List addNewCard={addNewCard} toggleAddCardForm={toggleAddCardForm} onAddBtnClick={toggleHandlerAddButton} key={list.id} list={list}/>
                })
            }

        </div>
    )
}
