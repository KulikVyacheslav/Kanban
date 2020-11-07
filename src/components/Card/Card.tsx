import React, {ReactNode} from "react";
import './Card.scss';
import { ICards, IComments } from "../../interfaces/interfaces";
import { useModal } from "react-modal-hook";

interface CardProps {
    card: ICards,
    comments: Array<IComments>,
    render: () => ReactNode
    renderCardModal: any

}


export const Card: React.FC<CardProps> = ({card, comments, render, renderCardModal}) => {


    const [showModal, hideModal] = useModal(() => (
        renderCardModal(hideModal)
    ), [renderCardModal]);


    return (

             <div onClick={showModal} className="cards">
                <div className="cards__title">
                    <p>{card.title}</p>
                </div>
                <div className="cards__components">
                    {comments.length > 0 && render()}
                </div>
            </div>

    );
};