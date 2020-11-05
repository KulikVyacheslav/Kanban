import React, {} from 'react';
import './Board.scss';
import { RenderLists, ILists, ICards } from "../../interfaces/interfaces";


interface BoardProps {
    lists: Array<ILists>,
    cards: Array<ICards>,
    handlerResetState(event: React.MouseEvent<HTMLDivElement>): void
    render: RenderLists
}


export const Board: React.FC<BoardProps> = ({lists, cards, handlerResetState, render}) => {


    return (
        <div onClick={handlerResetState}
             className="board">
            {lists.map((list: any) => {
                const cardsCurrentList: Array<ICards> = cards.filter((card) => card.idList === list.id);
                return render(list.id, list, cardsCurrentList);
            })
            }
        </div>
    );
};
