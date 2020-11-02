import React from "react";
import './Card.scss';
import {Comments} from '../Comments';
import {ICards, IComments} from '../Layout/Layout';
import {Link, useLocation} from "react-router-dom";

interface CardProps {
    card: ICards,
    comments: Array<IComments>
}

export const Card: React.FC<CardProps> = ({card, comments}) => {
    let location = useLocation();
    return (

            <div className="cards">
                <Link
                    to={{
                        pathname: `/cards/${card.id}`,
                        state: { modal: location }
                    }}
                    className='cards__link cards_color-gray'
                >
                <div className="cards__title">
                    <p>{card.title}</p>
                </div>
                <div className="cards__components">
                    {comments.length > 0 &&
                    <Comments commentsCount={comments.length}/>
                    }
                </div>
                </Link>
            </div>

    );
};