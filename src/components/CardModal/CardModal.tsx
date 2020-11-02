import React, { useCallback, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './CardModal.scss';
import close from './close.svg';
import {ICards, IComments} from "../Layout/Layout";
import { CommentsModal } from 'components/CommentsModal';

interface CardModalProps {
    cards: Array<ICards>;
    comments: Array<IComments>
}

interface ParamTypes {
    id: string
}

export const CardModal: React.FC<CardModalProps> = ({ cards, comments }) => {

    const history = useHistory();
    const params = useParams<ParamTypes>();
    const card: ICards | undefined = cards.find(card => card.id === params.id);
    const commentsCard = comments.filter(comment => comment.idCard === params.id);

    const handlerCloseModal = useCallback(() => {
        history.goBack();
    }, [history]);


    return (
        <div className="card-modal">

            <div className="card-modal__content">
                <div onClick={handlerCloseModal} className="card-modal__close">
                    <img src={close} alt="close"/>
                </div>
                <div className="card-modal__data">
                    <div className="card-modal__title">
                        <h3>{card?.title}</h3>
                    </div>
                    <div className="card-modal__description">
                        <span>test description</span>
                    </div>
                    <div className="card-modal__comment">
                        {commentsCard.length > 0 &&
                        commentsCard.map( (comment) => <CommentsModal key={comment.id} comment={comment} />)
                        }
                    </div>
                    <div className="card-modal__form">
                        <form>
                            <div className="form-group">
                                <input type="textarea" placeholder='write comment'/>
                            </div>
                            <button className="btn btn-primary">Save</button>
                        </form>
                    </div>
                </div>
                <div className="card-modal__action">
                    <div className="card-modal__delete">
                        <button>Delete Card</button>
                    </div>
                </div>
            </div>
        </div>
    );
};