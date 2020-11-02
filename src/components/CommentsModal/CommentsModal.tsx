import React from 'react';
import './CommentsModal.scss';
import { IComments } from "../Layout/Layout";

interface CommentsModalProps {
    comment: IComments
}

export const CommentsModal: React.FC<CommentsModalProps> = ({ comment }) => {
    console.log(comment);
    return (
        <div className="comments-modal">
            <div className="comments-modal__author">
                <h5 className="comments-modal__author-title">
                    {comment.author}
                </h5>
            </div>
            <div className="comments-modal__text">
                <p>{comment.text}</p>
            </div>
            <div className="comments-modal__delete">
                <a href='/'>Delete</a>
            </div>

        </div>
    );
};
