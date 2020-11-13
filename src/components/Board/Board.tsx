import React, {useState} from 'react';
import './Board.scss';
import {List} from "../List";
import {useSelector} from "react-redux";
import { selectLists } from 'ducks/Lists/listSlice';
import {ToggleAddButton} from "../../interfaces/interfaces";



export const Board: React.FC = () => {

    const lists = useSelector(selectLists);

    const [toggleAddCardButton, setToggleAddCardButton] = useState<ToggleAddButton>({
        id: null,
        state: false
    });


        const handlerResetState = (event: React.MouseEvent<HTMLDivElement>): void => {
        if (toggleAddCardButton.state) {
            setToggleAddCardButton({
                state: false,
                id: null
            });
        }
    };



    return (
        <>
            <div onClick={handlerResetState}
                 className="board">
                {lists.map( list => <List toggleAddCardButton={toggleAddCardButton} setToggleAddCardButton={setToggleAddCardButton} key={list.id}  listId={list.id} />)}
            </div>
        </>
    );
};