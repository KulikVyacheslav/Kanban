import React, {} from 'react';
import './Board.scss';
import {List} from "../List";
import {useDispatch, useSelector} from "react-redux";
import { selectLists } from 'components/List/redux/listSlice';
import {changeToggle, selectToogle} from "./redux/toggleAddCardButtonSlice";



export const Board: React.FC = () => {

    const lists = useSelector(selectLists);
    const toggleAddCardButton = useSelector(selectToogle);
    const dispatch = useDispatch();

        const handlerResetState = (event: React.MouseEvent<HTMLDivElement>): void => {
        if (toggleAddCardButton.state) {
            dispatch(changeToggle({
                state: false,
                id: null
            }));
        }
    };



    return (
        <>
            <div onClick={handlerResetState}
                 className="board">
                {lists.map( list => <List key={list.id}  listId={list.id} />)}
            </div>
        </>
    );
};