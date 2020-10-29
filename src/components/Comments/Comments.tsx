import React from "react";
import './Comments.scss'
import commentsIcons from './comments.svg'

interface CommentsProps {
    comment: {
        author: string,
        id: string,
        text: string
    }
}


export const Comments: React.FC<CommentsProps> = () => {
    return (
        <div className="comments">
            <div className="comments__img">
                <img src={commentsIcons} alt="comments" />
            </div>
            <div className="comments__count">
                <p>1</p>
            </div>
        </div>
    )
}