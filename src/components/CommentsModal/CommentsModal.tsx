import React from 'react';
import './CommentsModal.scss';
import { IComments } from "../../interfaces/interfaces";

interface CommentsModalProps {
    comment: IComments
}

export const CommentsModal: React.FC<CommentsModalProps> = ({ comment }) => {

    return (
        <div className="comments-modal comments-modal_mt">
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
