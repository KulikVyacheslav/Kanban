import React, {} from 'react';
import {Navbar} from '../Navbar';
import {Board} from '../Board';
import {Greeting} from '../Greeting';
import {CardModal} from '../CardModal';
import {Switch, Route, withRouter} from 'react-router-dom';
import {nanoid} from 'nanoid';

import './Layout.scss';

export interface IProfile {
    name: string,
    id: string
}

export interface ILists {
    title: string,
    id: string
}

export interface ICards {
    id: string,
    idList: string,
    title:  string,
    description: string,
}

export interface IComments {
    author: string,
    id: string,
    idCard: string,
    text: string
}

export interface IState {
    profile: IProfile,
    lists: Array<ILists>,
    cards: Array<ICards>,
    comments: Array<IComments>
}

type ParamsState = "profile" | "lists" | "cards" | "comments"


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
                    title:  'Test card',
                    description: 'Test desc'
                },
                {
                    id: 'asdas213sadasd',
                    idList: 'adc123s',
                    title:  'Test card 2',
                    description: 'Test desc'
                },
                {
                    id: 'asdas213sadaas',
                    idList: 'adc123s123',
                    title:  'Test card 2',
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
            ]
        };

        this.handlerName = this.handlerName.bind(this);
        this.addNewCard = this.addNewCard.bind(this);
        this.changeTitleList = this.changeTitleList.bind(this);
        this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
        this.saveToLocalStorageTruly = this.saveToLocalStorageTruly.bind(this);

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

    saveToLocalStorage(params: ParamsState ): void {
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


    render() {
        const {profile, lists,  cards, comments} = this.state;
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
                                addNewCard={this.addNewCard}
                                changeTitleList={this.changeTitleList}
                                lists={lists}
                                cards={cards}
                                comments={comments}
                            />
                        </Route>
                    </Switch>
                    {isModal && <Route path="/cards/:id" children={<CardModal lists={lists} comments={comments} cards={cards}/>} />}
                </div>
            </>
        );
    }
}

export const Layout = withRouter(LayoutComponent);

