import React, {useCallback} from "react";
import './Card.scss';
import { useLocation, useHistory } from "react-router-dom";
import {RenderComments, ICards, IComments } from "../../interfaces/interfaces";

interface CardProps {
    card: ICards,
    comments: Array<IComments>,
    render: RenderComments,
    key: string

}

export const Card: React.FC<CardProps> = ({card, comments, render}) => {
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
                    {comments.length > 0 && render(comments.length)}
                    {/*// <Comments commentsCount={comments.length}/>*/}

                </div>
            </div>

    );
};