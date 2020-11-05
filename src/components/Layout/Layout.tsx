import React, {} from 'react';
import {Navbar} from '../Navbar';
import {Board} from '../Board';
import {Greeting} from '../Greeting';
import {CardModal} from '../CardModal';
import {List} from '../List';
import {Card} from '../Card';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {nanoid} from 'nanoid';
import {ICards, IComments, ILists, IProfile, ToggleAddButton} from '../../interfaces/interfaces';
import './Layout.scss';
import {IDBoardState, ParamsState} from "../../types/types";
import {Comments} from "../Comments";
import {CommentsModal} from "../CommentsModal";
import {Profile} from "../Profile";


export interface IState {
    profile: IProfile,
    lists: Array<ILists>,
    cards: Array<ICards>,
    comments: Array<IComments>,
    toggleAddCardButton: ToggleAddButton
}


export class LayoutComponent extends React.Component<any, IState> {
    constructor(props: any) {
        super(props);

        this.state = {
            profile: {
                name: '',
                id: nanoid()
            },
            lists: [
                {
                    title: 'TODO',
                    id: 'adc123s',
                },
                {
                    title: 'In Progress',
                    id: 'adc123s123',
                },
                {
                    title: 'Testing',
                    id: nanoid(),
                },
                {
                    title: 'Done',
                    id: nanoid(),
                }
            ],
            cards: [
                {
                    id: 'asdas213sad',
                    idList: 'adc123s',
                    title: 'Test card',
                    description: 'Test desc'
                },
                {
                    id: 'asdas213sadasd',
                    idList: 'adc123s',
                    title: 'Test card 2',
                    description: 'Test desc'
                },
                {
                    id: 'asdas213sadaas',
                    idList: 'adc123s123',
                    title: 'Test card 2',
                    description: 'Test desc'
                }
            ],
            comments: [
                {
                    author: 'WebDev',
                    id: 'dasdasd123213saasd',
                    idCard: 'asdas213sad',
                    text: 'Test comments'
                },
                {
                    author: 'WebDev',
                    id: 'dasdasdasd12asda',
                    idCard: 'asdas213sad',
                    text: 'Test comments 2'
                }
            ],
            toggleAddCardButton: {
                id: null,
                state: false
            },
        };

        this.handlerName = this.handlerName.bind(this);
        this.handlerResetState = this.handlerResetState.bind(this);
        this.toggleHandlerAddButton = this.toggleHandlerAddButton.bind(this);
        this.addNewCard = this.addNewCard.bind(this);
        this.deleteCard = this.deleteCard.bind(this);
        this.addNewComment = this.addNewComment.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.changeTitleList = this.changeTitleList.bind(this);
        this.changeCommentText = this.changeCommentText.bind(this);
        this.changeTitleCards = this.changeTitleCards.bind(this);
        this.changeDescriptionCard = this.changeDescriptionCard.bind(this);
        this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
        this.saveToLocalStorageTruly = this.saveToLocalStorageTruly.bind(this);
        this.renderList = this.renderList.bind(this);
        this.renderCard = this.renderCard.bind(this);
        this.renderCommentsModal = this.renderCommentsModal.bind(this);

    }

    componentDidMount(): void {
        this.saveToLocalStorage('profile');
        this.saveToLocalStorage('lists');
        this.saveToLocalStorage('cards');
        this.saveToLocalStorage('comments');
    }

    componentDidUpdate(): void {
        this.saveToLocalStorageTruly('profile');
        this.saveToLocalStorageTruly('lists');
        this.saveToLocalStorageTruly('cards');
        this.saveToLocalStorageTruly('comments');
    }

    handlerName(name: string): void {
        this.setState((state) => ({
            profile: {
                ...state.profile,
                name: name,
            }
        }));
    }

    handlerResetState(event: React.MouseEvent<HTMLDivElement>): void {
        const {toggleAddCardButton} = this.state;
        if (toggleAddCardButton.state) {
            this.setState({
                toggleAddCardButton: {
                    state: false,
                    id: null
                }
            });
        }
    }


    toggleHandlerAddButton(id: IDBoardState): void {
        const {toggleAddCardButton} = this.state;
        if (id !== toggleAddCardButton.id && toggleAddCardButton.id !== null) {
            this.setState(state => {
                return {
                    toggleAddCardButton: {
                        ...state.toggleAddCardButton,
                        id
                    }
                };
            });
        } else {
            this.setState(state => {
                return {
                    toggleAddCardButton: {
                        state: !state.toggleAddCardButton.state,
                        id
                    }
                };
            });
        }
        if (id === null) {
            this.setState({
                toggleAddCardButton: {
                    state: false,
                    id: null
                }
            });
        }
    }

    addNewCard(idList: string, idCard: string, titleCard: string): void {
        this.setState((state) => {
            return {
                cards: state.cards.concat([{
                    id: idCard,
                    idList,
                    title: titleCard,
                    description: ''
                }])
            };
        });
    }

    deleteCard(idCard: string): void {

        this.setState(state => {
            return {
                cards: state.cards.filter(card => card.id !== idCard)
            };
        });
    }

    addNewComment(idCard: string, text: string): void {

        const newComment = {
            id: nanoid(),
            author: this.state.profile.name,
            idCard,
            text
        };
        this.setState(state => {
            return {
                comments: state.comments.concat([newComment])
            };
        });

    }

    deleteComment(idComment: string): void {
        this.setState(state => {
            return {
                comments: state.comments.filter(comment => comment.id !== idComment)
            };
        });
    }

    changeCommentText(idComment: string, text: string): void {
        this.setState(state => {
            return {
                comments: state.comments.map(comment => {
                    if (comment.id === idComment) {
                        return {
                            ...comment,
                            text
                        };
                    }
                    return comment;
                })
            };
        });
    }

    changeTitleList(idList: string, titleList: string): void {
        const newList = this.state.lists.map((listItem) => {
            if (listItem.id === idList) {
                return {
                    ...listItem,
                    title: titleList
                };
            }
            return listItem;
        });
        this.setState({
            lists: newList
        });
    }

    changeTitleCards(idCard: string, title: string): void {
        const newCards = this.state.cards.map(card => {
            if (card.id === idCard) {
                return {
                    ...card,
                    title
                };

            }
            return card;
        });

        this.setState({
            cards: newCards

        });
    }


    changeDescriptionCard(idCard: string, description: string): void {
        const newCards = this.state.cards.map(card => {
            if (card.id === idCard) {
                return {
                    ...card,
                    description
                };

            }
            return card;
        });

        this.setState({
            cards: newCards
        });
    }

    saveToLocalStorage(params: ParamsState): void {
        const localVar = JSON.parse(localStorage.getItem(params) as string);
        if (!localVar) {
            localStorage.setItem(params, JSON.stringify(this.state[params]));
        } else {
            // @ts-ignore
            //TODO
            this.setState({
                [params]: localVar
            });
        }
    }

    saveToLocalStorageTruly(params: string): void {
        // @ts-ignore
        //TODO
        localStorage.setItem(params, JSON.stringify(this.state[params]));
    }

    renderList(id: string,
               list: ILists,
               cardsCurrentList: Array<ICards>): any {
        return <List
            changeTitleList={this.changeTitleList}
            addNewCard={this.addNewCard}
            toggleAddCardForm={this.state.toggleAddCardButton}
            onAddBtnClick={this.toggleHandlerAddButton}
            key={id}
            list={list}
            cards={cardsCurrentList}
            comments={this.state.comments}
            render={this.renderCard}
        />;
    }

    renderCard(commentsCurrentCard: Array<IComments>, cardId: string, card: ICards): any {

        return <Card
            comments={commentsCurrentCard}
            key={cardId}
            card={card}
            render={this.renderComment}
        />;

    }

    renderComment(commentsLength: number) {
        return <Comments commentsCount={commentsLength}/>;
    }

    renderCommentsModal(commentId: string, comment: IComments) {
        return <CommentsModal
            key={commentId}
            comment={comment}
            deleteComment={this.deleteComment}
            changeCommentText={this.changeCommentText}
        />;
    }


    render() {
        const {profile, lists, cards, comments} = this.state;
        const {location} = this.props;
        const isModal = location.state?.modal;
        return (
            <>
                <Navbar/>
                <div className="content">
                    {(profile.name === '' && <Greeting handlerName={this.handlerName}/>)}
                    <Switch location={isModal || location}>
                        <Route exact path="/board">
                            <Board
                                render={this.renderList}
                                handlerResetState={this.handlerResetState}
                                lists={lists}
                                cards={cards}
                            />
                        </Route>
                        <Route path="/profile">
                            <Profile changeProfileName={this.handlerName} profile={profile}/>
                        </Route>
                        <Route path="*">
                            <Redirect to="/board"/>
                        </Route>
                    </Switch>
                    {isModal &&
                    <Route path="/cards/:id" children={
                        <CardModal changeTitleCards={this.changeTitleCards}
                                   changeDescriptionCard={this.changeDescriptionCard}
                                   deleteCard={this.deleteCard}
                                   addNewComment={this.addNewComment}
                                   lists={lists}
                                   comments={comments}
                                   cards={cards}
                                   render={this.renderCommentsModal}
                        />}
                    />}
                </div>
            </>
        );
    }
}

export const Layout = withRouter(LayoutComponent);

