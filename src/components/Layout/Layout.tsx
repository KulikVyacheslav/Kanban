import React, {} from 'react';
import {Navbar} from '../Navbar';
import {Board} from '../Board';
import {Greeting} from '../Greeting';
import {Switch, Route} from 'react-router-dom'
import {nanoid} from 'nanoid'
import update from 'immutability-helper';

import './Layout.scss'

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
                    id: nanoid(),
                    cards: [
                        {
                            title: 'Test card',
                            id: nanoid(),
                            comments: [
                                {
                                    author: '',
                                    id: nanoid(),
                                    text: 'Test comments'
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'In Progress',
                    id: nanoid(),
                    cards: [
                        {
                            title: 'Test card 2',
                            id: nanoid(),
                            comments: []
                        }
                    ],
                },
                {
                    title: 'Testing',
                    id: nanoid(),
                    cards: [],
                },
                {
                    title: 'Done',
                    id: nanoid(),
                    cards: [],
                }

            ]
        }

    }

    saveToLocalStorage = (params: string): void => {
        const localVar = JSON.parse(localStorage.getItem(params) as string)
        if (!localVar) {
            localStorage.setItem(params, JSON.stringify(this.state[params]))
        } else {
            this.setState({
                [params]: localVar
            })
        }
    }
    saveToLocalStorageTruly = (params: string): void => {
        localStorage.setItem(params, JSON.stringify(this.state[params]))
    }

    componentDidMount(): void {
        this.saveToLocalStorage('profile')
        this.saveToLocalStorage('lists')
    }

    componentDidUpdate(): void {
        this.saveToLocalStorageTruly('profile')
        this.saveToLocalStorageTruly('lists')
    }

    handlerName = (name: string): void => {
        this.setState({
            profile: {
                ...this.state.profile,
                name: name,
            }
        })
    }

    addNewCard = (idList: string, idCard: string, titleCard: string): void => {
        let indexList;
        this.state.lists.forEach((el: { title: string, id: string, cards: [] }, ind: number) => {
            if (el.id === idList) {
                indexList = ind
            }
        })

        const addCardsData = {
            ...this.state.lists[indexList as any],
            cards: this.state.lists[indexList as any].cards.concat([{
                title: titleCard,
                id: idCard,
                comments: []
            }] as any)
        }
        const listState = this.state.lists
        listState.splice(indexList, 1, addCardsData)
        this.setState({
            lists: listState
        })
    }


    render() {
        const {profile, lists} = this.state
        return (
            <>
                <Navbar/>
                <div className="content">
                    {(profile.name === '' && <Greeting handlerName={this.handlerName}/>)}
                    <Switch>
                        <Route exact path="/board">
                            <Board addNewCard={this.addNewCard} lists={lists}/>
                        </Route>
                    </Switch>
                </div>
            </>
        )
    }
}


