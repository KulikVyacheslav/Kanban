import React, {ReactNode} from "react";
import './Card.scss';
import { ICards, IComments } from "../../interfaces/interfaces";
import { useModal } from "react-modal-hook";
import {useSelector} from "react-redux";
import {selectCards} from "./redux/cardsSlice";

interface CardProps {
    cardId: string,
    // comments: Array<IComments>,
    // render: () => ReactNode
    // renderCardModal: any

}


export const Card: React.FC<CardProps> = ({cardId}) => {


    // const [showModal, hideModal] = useModal(() => (
    //     renderCardModal(hideModal)
    // ), [renderCardModal]);

   const cards = useSelector(selectCards);
    const card = cards.find( card => card.id === cardId);

    return (

             // <div onClick={showModal} className="cards">
             <div className="cards">
                <div className="cards__title">
                    <p>{card?.title}</p>
                </div>
                <div className="cards__components">
                    {/*{comments.length > 0 && render()}*/}
                </div>
            </div>

    );
};