import React, {} from 'react';
import {Navbar} from '../Navbar';
import {Board} from '../Board';
import {Greeting} from '../Greeting';
import {Switch, Route} from 'react-router-dom';
import {nanoid} from 'nanoid';

import './Layout.scss';

export class Layout extends React.Component<any, any> {
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
                    title:  'Test card'
                },
                {
                    id: 'asdas213sadasd',
                    idList: 'adc123s',
                    title:  'Test card 2'
                },
                {
                    id: 'asdas213sadaas',
                    idList: 'adc123s123',
                    title:  'Test card 2'
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
                    id: 'dasdasd123213saasd',
                    idCard: 'asdas213sad',
                    text: 'Test comments 2'
                }
            ]
        };

        this.handlerName = this.handlerName.bind(this);
        this.getIndexList = this.getIndexList.bind(this);
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
        this.setState((state: any) => ({
            profile: {
                ...state.profile,
                name: name,
            }
        }));
    }

    getIndexList(idList: string) {
        let indexList: number = -1;
        this.state.lists.forEach((el: { title: string, id: string, cards: [] }, ind: number) => {
            if (el.id === idList) {
                indexList = ind;
            }
        });
        return indexList;
    }

    addNewCard(idList: string, idCard: string, titleCard: string): void {
        this.setState((state: any) => {
            return {
                cards: state.cards.concat([{
                    id: idCard,
                    idList,
                    title: titleCard
                }])
            };
        });
    }

    changeTitleList(idList: string, titleList: string): void {
        const newList = this.state.lists.map((listItem: any) => {
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

    saveToLocalStorage(params: string): void {
        const localVar = JSON.parse(localStorage.getItem(params) as string);
        if (!localVar) {
            localStorage.setItem(params, JSON.stringify(this.state[params]));
        } else {
            this.setState({
                [params]: localVar
            });
        }
    }

    saveToLocalStorageTruly(params: string): void {
        localStorage.setItem(params, JSON.stringify(this.state[params]));
    }


    render() {
        const {profile, lists,  cards, comments} = this.state;
        return (
            <>
                <Navbar/>
                <div className="content">
                    {(profile.name === '' && <Greeting handlerName={this.handlerName}/>)}
                    <Switch>
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
                </div>
            </>
        );
    }
}

