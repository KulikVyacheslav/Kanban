import React from "react";
import './Card.scss';
import { useModal } from "react-modal-hook";
import {useSelector} from "react-redux";
import {selectCardByCardId, selectCommentByCardId} from "../../ducks";
import {CardModal} from "../CardModal";
import {Comments} from "../Comments";
import {RootStateI} from "../../interfaces/interfaces";

interface CardProps {
    cardId: string,
}


export const Card: React.FC<CardProps> = ({cardId}) => {

    const card = useSelector((state: RootStateI) => selectCardByCardId(state, cardId));
    const commentsCard = useSelector((state: RootStateI) => selectCommentByCardId(state, cardId));

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