import React from "react";
import './Card.scss';
import { useModal } from "react-modal-hook";
import {useSelector} from "react-redux";
import {selectCards} from "./redux/cardsSlice";
import {CardModal} from "../CardModal";
import {selectComments} from "../Comments/redux/commentsSlice";
import {Comments} from "../Comments";

interface CardProps {
    cardId: string,
}


export const Card: React.FC<CardProps> = ({cardId}) => {

    const cards = useSelector(selectCards);
    const card = cards.find( card => card.id === cardId);
    const comments = useSelector(selectComments);
    const commentsCard = comments.filter( comment => comment.idCard === card?.id);

    const [showModal, hideModal] = useModal(() => (
    <CardModal
        hideModal={hideModal}
        cardId={cardId}

    />
    ), [cardId]);


    return (

             <div onClick={showModal} className="cards">
                <div className="cards__title">
                    <p>{card?.title}</p>
                </div>
                <div className="cards__components">
                    {commentsCard.length > 0 &&
                    <Comments commentsCount={commentsCard.length} />}
                </div>
            </div>

    );
};