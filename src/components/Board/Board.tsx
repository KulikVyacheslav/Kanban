import React, {useState} from 'react';
import {List} from '../List'
import './Board.scss'
import {ToggleAddButton, ToggleTitleList} from "../../interfaces/interfaces";

interface BoardProps {
    lists: [],
    addNewCard(idList: string, idCard: string, titleCard: string): void,
    changeTitleList(idList: string, titleList: string): void
}


export const Board: React.FC<BoardProps> = (props) => {
    const {lists, addNewCard, changeTitleList} = props

    const [toggleAddCardForm, setToggleAddCardForm] = useState<ToggleAddButton>({
        state: false,
        id: null
    })

    const [toggleTitleList, setToggleTitleList] = useState<ToggleTitleList>({
        state: false,
        id: null
    })

    const toggleHandlerAddButton = (id: string | null):void => {
        toggleHandlerUniversal(id, toggleAddCardForm, setToggleAddCardForm);
    }
    const toggleHandlerTitleList = (id: string | null):void => {
        toggleHandlerUniversal(id, toggleTitleList, setToggleTitleList);
    }

    const resetStateToggle = (id: string | null):void => {
        resetStateToggleUniversal(setToggleAddCardForm, toggleAddCardForm)
        resetStateToggleUniversal(setToggleTitleList, toggleTitleList)
    }

    const resetStateToggleUniversal = (toggleSet:  React.Dispatch<React.SetStateAction<ToggleTitleList>>, toggleTarget: ToggleAddButton):void => {
        if(toggleTarget.state) {
            toggleSet({
                state: false,
                id: null
            })
        }
    }

    const toggleHandlerUniversal = (id:string|null, toggleTarget: ToggleAddButton, toggleSet:  React.Dispatch<React.SetStateAction<ToggleTitleList>>):void => {
        if(id !== toggleTarget.id  && toggleTarget.id !== null) {
            toggleSet(prevState => {
                return {
                    ...prevState,
                    id
                }
            })
        } else {
            toggleSet(prevState => {
                return {
                    state: !prevState.state,
                    id
                }
            })
        }
        if (id === null) {
            resetStateToggleUniversal(toggleSet, toggleTarget)
        }
    }

    return (
         <div onClick={(event:React.MouseEvent<HTMLDivElement>) => resetStateToggle(event.currentTarget.className)} className='board'>
            {
                lists.map((list: any) => {
                    return <List changeTitleList={changeTitleList} addNewCard={addNewCard} toggleAddCardForm={toggleAddCardForm} toggleTitleList={toggleTitleList} onChTitleClick={toggleHandlerTitleList} onAddBtnClick={toggleHandlerAddButton} key={list.id} list={list}/>
                })
            }

        </div>
    )
}
