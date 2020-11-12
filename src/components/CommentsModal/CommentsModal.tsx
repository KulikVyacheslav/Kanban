import React, {useCallback, useState} from 'react';
import './CommentsModal.scss';
import {changeCommentText, deleteComment, fetchCommentById, selectComments} from 'ducks';
import {useDispatch, useSelector} from "react-redux";

interface CommentsModalProps {
    commentId: string
}

export const CommentsModal: React.FC<CommentsModalProps> = ({ commentId }) => {

    const dispatch = useDispatch();
    const comments = useSelector(selectComments);
    const comment = comments.find( comment => comment.id === commentId);

    const [toggleChangeComment, setToggleChangeComment] = useState<boolean>(false);
    const handleDeleteComment = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
        if(window.confirm('Are you sure?')) {
            dispatch(deleteComment(comment?.id as string));
        }
        event.preventDefault();
    }, [dispatch, comment?.id]);


    const handlerSaveCommentChange = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.ctrlKey && event.key === 'Enter') {
            setToggleChangeComment(false);
        }
    }, []);

    return (
        <div className="comments-modal comments-modal_mt">
            <div className="comments-modal__author">
                <h5 className="comments-modal__author-title">
                    {comment?.author}
                </h5>
            </div>
            <div className="comments-modal__text">
                {toggleChangeComment ?
                    <textarea
                        value={comment?.text}
                        onChange={ev => dispatch(changeCommentText({id: comment?.id as string, text: ev.currentTarget.value}))}
                        onKeyUp={handlerSaveCommentChange}
                    /> :
                    <p onClick={() => setToggleChangeComment(true)}>{comment?.text}</p>
                }
            </div>
            <div className="comments-modal__delete">
                <a onClick={handleDeleteComment} href='/'>Delete</a>
            </div>
            <button onClick={() => dispatch(fetchCommentById(comment?.id as string))}>stst</button>
        </div>
    );
};
