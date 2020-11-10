import React, {useCallback, useState} from 'react';
import './CommentsModal.scss';
import { IComments } from "../../interfaces/interfaces";

interface CommentsModalProps {
    commentId: string
}

export const CommentsModal: React.FC<CommentsModalProps> = ({ commentId }) => {

    const [toggleChangeComment, setToggleChangeComment] = useState<boolean>(false);
    const handleDeleteComment = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
        if(window.confirm('Are you sure?')) {
            //deleteComment(comment?.id);
        }
        event.preventDefault();
   // }, [deleteComment, comment?.id]);
    }, []);

    const handlerSaveCommentChange = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.ctrlKey && event.key === 'Enter') {
            setToggleChangeComment(false);
        }
    }, []);

    return (
        <div className="comments-modal comments-modal_mt">
            <div className="comments-modal__author">
                <h5 className="comments-modal__author-title">
                    {/*{comment.author}*/}
                </h5>
            </div>
            <div className="comments-modal__text">
                {toggleChangeComment ?
                    <textarea
                        // value={comment?.text}
                        // onChange={ev => changeCommentText(comment.id, ev.currentTarget.value)}
                        onKeyUp={handlerSaveCommentChange}
                    /> :
                    // <p onClick={() => setToggleChangeComment(true)}>{comment.text}</p>
                    <p onClick={() => setToggleChangeComment(true)}></p>
                }

            </div>
            <div className="comments-modal__delete">
                <a onClick={handleDeleteComment} href='/'>Delete</a>
            </div>

        </div>
    );
};
