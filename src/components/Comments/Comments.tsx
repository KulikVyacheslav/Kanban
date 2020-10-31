import React from "react";
import './Comments.scss';
import commentsIcons from './comments.svg';

interface CommentsProps {
    // comment: {
    //     author: string,
    //     id: string,
    //     text: string
    // }
    commentsCount: number
}


export const Comments: React.FC<CommentsProps> = ({commentsCount}) => {
    return (
        <div className="comments">
            <div className="comments__img">
                <img src={commentsIcons} alt="comments" />
            </div>
            <div className="comments__count">
                <p>{commentsCount}</p>
            </div>
        </div>
    );
};