import React, {useCallback, useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import './CardModal.scss';
import close from './close.svg';
import cardIcon from './card.svg';
import description from './description.svg';
import commentsIcon from './comments.svg';
import {ICards, IComments, ILists, RenderCommentsModal} from "../../interfaces/interfaces";

interface CardModalProps {
    changeTitleCards(idCard: string | undefined, title: string): void,
    changeDescriptionCard(idCard: string | undefined, description: string): void,
    addNewComment(idCard: string | undefined, text: string): void,
    deleteCard(idCard: string | undefined): void,
    cards: Array<ICards>,
    comments: Array<IComments>,
    lists: Array<ILists>,
    render: RenderCommentsModal,
}

interface ParamTypes {
    id: string
}

export const CardModal: React.FC<CardModalProps> = ({changeTitleCards, changeDescriptionCard, addNewComment, deleteCard, cards, comments, lists, render}) => {

    const history = useHistory();
    const params = useParams<ParamTypes>();
    const card: ICards | undefined = cards.find(card => card.id === params.id);
    const commentsCard = comments.filter(comment => comment.idCard === params.id);
    const listCards = lists.find(list => list.id === card?.idList);

    const [toggleTitleCard, setToggleTitleCard] = useState<boolean>(false);
    const [toggleDescCard, setToggleDescCard] = useState<boolean>(false);
    const [newComment, setNewComment] = useState<string>('');


    const handlerCloseModal = useCallback(() => {
        history.goBack();
    }, [history]);

    const handlerToggleCards = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setToggleTitleCard(true);

    }, []);

    const handlerToggleCardsReset = useCallback(() => {
        (toggleTitleCard && setToggleTitleCard(false));
        (toggleDescCard && setToggleDescCard(false));
    }, [toggleTitleCard, toggleDescCard]);

    const handlerSendComment = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.ctrlKey && event.key === 'Enter') {
            addNewComment(card?.id, newComment);
            setNewComment('');
        }
    }, [addNewComment, setNewComment, card?.id, newComment]);

    const handlerChangeDescription = useCallback((event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.ctrlKey && event.key === 'Enter') {
            setToggleDescCard(false);
        }
    }, [setToggleDescCard]);


    const handlerDeleteCard = useCallback(() => {
        if(window.confirm('You are sure?')) {
            deleteCard(card?.id);
            history.push('/board');
        }

    }, [card?.id, deleteCard, history]);

    useEffect(() => {
        const handleEsc = (event: any) => {
            if (event.key === 'Escape') {
                history.push('/board');
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [history]);

    return (
        <div className="card-modal">

            <div onClick={handlerToggleCardsReset} className="card-modal__content">
                <div onClick={handlerCloseModal} className="card-modal__close">
                    <img src={close} alt="close"/>
                </div>
                <div className="card-modal__data">
                    <div className="card-modal__title">
                        <img src={cardIcon} alt="close" className="card-modal__img"/>
                        {toggleTitleCard ?
                            <input
                                onClick={(el) => el.stopPropagation()}
                                type="text"
                                value={card?.title}
                                onChange={el => changeTitleCards(card?.id, el.currentTarget.value)}
                            /> :
                            <h3 onClick={handlerToggleCards}>{card?.title}</h3>
                        }

                    </div>
                    <div className="card-modal__list-title">
                        <h6>in list {listCards?.title}</h6>
                    </div>
                    <div className="card-modal__description">
                        <div className="card-modal__description-title">
                            <img src={description} alt="description" className="card-modal__img"/>
                            <h6>Description</h6>
                        </div>
                        {toggleDescCard ?
                            <textarea onClick={(el) => el.stopPropagation()}
                                      className="card-modal__description-field card-modal_ml-img"
                                      value={card?.description}
                                      onKeyUp={handlerChangeDescription}
                                      onChange={el => changeDescriptionCard(card?.id, el.currentTarget.value)}
                                      placeholder="Add a more detailed description..."
                            /> :
                            card?.description ?
                                <p onClick={() => setToggleDescCard(true)}
                                   className="card-modal__description-field card-modal_ml-img">{card?.description}</p> :
                                <div onClick={() => setToggleDescCard(true)}
                                     className="card-modal__description-field card-modal_ml-img card-modal__description-empty">Add
                                    a more detailed description...</div>
                        }

                    </div>
                    <div className="card-modal__comment">
                        <div className="card-modal__comment-title">
                            <img src={commentsIcon} alt="comments" className="card-modal__img"/>
                            <h6>Comments</h6>
                        </div>
                        <div className="card-modal__form">
                            <form>
                                <textarea
                                    value={newComment}
                                    onKeyUp={handlerSendComment}
                                    onChange={el => setNewComment(el.currentTarget.value)}
                                    placeholder='write comment'/>
                                <button onClick={el => {
                                    el.preventDefault();
                                    addNewComment(card?.id, newComment);
                                    setNewComment('');
                                }} className="btn btn-primary card-modal__form-btn">Save
                                </button>
                            </form>
                        </div>
                        <div className="card-modal__comment-field">
                            {commentsCard.length > 0 &&
                            commentsCard.map((comment) => render(comment.id, comment))
                            }
                        </div>
                    </div>
                </div>
                <div className="card-modal__action">
                    <div className="card-modal__delete">
                        <button onClick={handlerDeleteCard} className="btn btn-danger">Delete Card</button>
                    </div>
                </div>
            </div>
        </div>
    );
};