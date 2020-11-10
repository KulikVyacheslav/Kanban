import React, {ReactNode} from "react";
import './Card.scss';
import { ICards, IComments } from "../../interfaces/interfaces";
import { useModal } from "react-modal-hook";
import {useDispatch, useSelector} from "react-redux";
import {selectCards} from "./redux/cardsSlice";
import {CardModal} from "../CardModal";
import {selectProfile} from "../Profile/redux/profileSlice";
import {selectLists} from "../List/redux/listSlice";
import {selectComments} from "../Comments/redux/commentsSlice";

interface CardProps {
    cardId: string,
}


export const Card: React.FC<CardProps> = ({cardId}) => {

    const cards = useSelector(selectCards);
    const profile = useSelector(selectProfile);
    const card = cards.find( card => card.id === cardId);
    const lists = useSelector(selectLists);
    const listCards = lists.find( list => list.id === card?.idList);
    const comments = useSelector(selectComments);
    const commentsCard = comments.filter( comment => comment.idCard === card?.id);
    const dispatch = useDispatch();

    const [showModal, hideModal] = useModal(() => (
        //renderCardModal(hideModal)
    <CardModal
        hideModal={hideModal}
        profile={profile}
        card={card as ICards}
        listCards={listCards as ICards}
        commentsCard={commentsCard as Array<IComments>}
        dispatch={dispatch}

    />
    ), [card?.id, profile, card, listCards, commentsCard, dispatch]);


    return (

             <div onClick={showModal} className="cards">
                <div className="cards__title">
                    <p>{card?.title}</p>
                </div>
                <div className="cards__components">
                    {/*{comments.length > 0 && render()}*/}
                </div>
            </div>

    );
};