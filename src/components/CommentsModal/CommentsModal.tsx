import React, {useCallback, useState} from 'react';
import './CommentsModal.scss';
import {fetchChangeCommentById, fetchDeleteCommentById, selectComments} from 'ducks';
import {useDispatch, useSelector} from "react-redux";

interface CommentsModalProps {
    commentId: string
}

export const CommentsModal: React.FC<CommentsModalProps> = ({ commentId }) => {


    const dispatch = useDispatch();
    const comments = useSelector(selectComments);
    const comment = comments.find( comment => comment.id === commentId);
    const  [commentText, setCommentText]  = useState<string>(comment?.text!);

    const [toggleChangeComment, setToggleChangeComment] = useState<boolean>(false);
    const handleDeleteComment = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
        if(window.confirm('Are you sure?')) {
            dispatch(fetchDeleteCommentById(comment?.id as string));
        }
        event.preventDefault();
    }, [dispatch, comment?.id]);


    const handlerSaveCommentChange = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.ctrlKey && event.key === 'Enter') {
            dispatch(fetchChangeCommentById({...comment!, text: commentText}));
            setToggleChangeComment(false);
        }
    }, [dispatch,comment, commentText]);

    const handleSaveComment = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
        dispatch(fetchChangeCommentById({...comment!, text: commentText}));
        setToggleChangeComment(false);
        event.preventDefault();
    }, [commentText, dispatch, comment]);

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
                        value={commentText}
                        onChange={e => setCommentText(e.currentTarget.value)}
                        onKeyUp={handlerSaveCommentChange}
                    /> :
                    <p onClick={() => setToggleChangeComment(true)}>{commentText}</p>
                }
            </div>
            <div className="comments-modal__handle">
                <div className="comments-modal__delete">
                    <a onClick={handleDeleteComment} href='/'>Delete</a>
                </div>
                {toggleChangeComment &&
                <div className="comments-modal__save">
                    <a onClick={handleSaveComment} href='/'>Save</a>
                </div>
                }
            </div>
        </div>
    );
};
