import React from "react";
import './Card.scss';
import {Comments}  from '../Comments';

interface CardProps {
    card: {
        title: string,
        id: string
    },
    comments: [
        {
            author: string,
            id: string,
            idCard: string,
            text: string
        }
    ]
}

export const Card: React.FC<CardProps> = ({card, comments}) => {

    return (
        <div className="cards">
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