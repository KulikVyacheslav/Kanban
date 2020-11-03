import React, { useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './CardModal.scss';
import close from './close.svg';
import cardIcon from './card.svg';
import description from './description.svg';
import commentsIcon from './comments.svg';
import { CommentsModal } from 'components/CommentsModal';
import {ICards, IComments, ILists} from "../../interfaces/interfaces";

interface CardModalProps {
    cards: Array<ICards>,
    comments: Array<IComments>,
    lists: Array<ILists>,
}

interface ParamTypes {
    id: string
}

export const CardModal: React.FC<CardModalProps> = ({ cards, comments, lists }) => {

    const history = useHistory();
    const params = useParams<ParamTypes>();
    const card: ICards | undefined = cards.find(card => card.id === params.id);
    const commentsCard = comments.filter(comment => comment.idCard === params.id);
    const listCards = lists.find( list => list.id === card?.idList );

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
                        <img src={cardIcon} alt="close" className="card-modal__img" />
                        <h3>{card?.title}</h3>
                    </div>
                    <div className="card-modal__list-title">
                        <h6>in list {listCards?.title}</h6>
                    </div>
                    <div className="card-modal__description">
                        <div className="card-modal__description-title">
                            <img src={description} alt="description" className="card-modal__img"/>
                            <h6>Description</h6>
                        </div>
                        <p className="card-modal__description-field card-modal_ml-img">{card?.description}</p>
                    </div>
                    <div className="card-modal__comment">
                        <div className="card-modal__comment-title">
                            <img src={commentsIcon} alt="comments" className="card-modal__img"/>
                            <h6>Comments</h6>
                        </div>
                        <div className="card-modal__form">
                            <form>
                                <textarea placeholder='write comment'/>
                                <button className="btn btn-primary card-modal__form-btn">Save</button>
                            </form>
                        </div>
                        <div className="card-modal__comment-field">
                            {commentsCard.length > 0 &&
                            commentsCard.map( (comment) => <CommentsModal key={comment.id} comment={comment} />)
                            }
                        </div>
                    </div>
                </div>
                <div className="card-modal__action">
                    <div className="card-modal__delete">
                        <button className="btn btn-danger">Delete Card</button>
                    </div>
                </div>
            </div>
        </div>
    );
};