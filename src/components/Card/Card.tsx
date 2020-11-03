import React, {useCallback} from "react";
import './Card.scss';
import {Comments} from '../Comments';
import { ICards, IComments  } from '../Layout/Layout';
import { useLocation, useHistory } from "react-router-dom";

interface CardProps {
    card: ICards,
    comments: Array<IComments>
}

export const Card: React.FC<CardProps> = ({card, comments}) => {
    let location = useLocation();
    let {push} = useHistory();

    const handleClickCard = useCallback(() => {
        push(`/cards/${card.id}`,{ modal: location });
    }, [push, location, card.id]);
    
    return (

            <div onClick={handleClickCard} className="cards">
                <div className="cards__title">
                    <p>{card.title}</p>
                </div>
                <div className="cards__components">
                    {comments.length > 0 &&
                    <Comments commentsCount={comments.length}/>
                    }
                </div>
            </div>

    );
};