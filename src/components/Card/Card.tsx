import React from "react";
import './Card.scss';
import {Comments}  from '../Comments';

interface CardProps {
    card: {
        title: string,
        id: string,
        comments: []
    }
}

export const Card: React.FC<CardProps> = ({card}) => {

    return (
        <div className="cards">
            <div className="cards__title">
                <p>{card.title}</p>
            </div>
            <div className="cards__components">
                {
                    card.comments.map( (comment: any) => {
                        return <Comments key={comment.id} comment={comment}/>;
                    } )
                }
            </div>
        </div>
    );
};