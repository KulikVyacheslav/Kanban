import React, {} from 'react';
import {Navbar} from '../Navbar';
import {Board} from '../Board';
import {Greeting} from '../Greeting';
import {Switch, Route} from 'react-router-dom'
import {nanoid} from 'nanoid'

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

        this.handlerName = this.handlerName.bind(this)
        this.getIndexList = this.getIndexList.bind(this)
        this.addNewCard = this.addNewCard.bind(this)
        this.changeTitleList = this.changeTitleList.bind(this)
        this.saveToLocalStorage = this.saveToLocalStorage.bind(this)
        this.saveToLocalStorageTruly = this.saveToLocalStorageTruly.bind(this)

    }
    componentDidMount(): void {
        this.saveToLocalStorage('profile')
        this.saveToLocalStorage('lists')
    }

    componentDidUpdate(): void {
        this.saveToLocalStorageTruly('profile')
        this.saveToLocalStorageTruly('lists')
    }

    handlerName(name: string): void {
        this.setState((state: any) => ({
            profile: {
                ...state.profile,
                name: name,
            }
        }))
    }

    getIndexList(idList: string) {
        let indexList :number = -1;
        this.state.lists.forEach((el: { title: string, id: string, cards: [] }, ind: number) => {
            if (el.id === idList) {
                indexList = ind
            }
        })
        return indexList;
    }

    addNewCard(idList: string, idCard: string, titleCard: string): void {
        const indexList = this.getIndexList(idList);

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

    changeTitleList(idList: string, titleList: string):void {
        const indexList = this.getIndexList(idList);
        const listState = this.state.lists
        const newList = {
            ...this.state.lists[indexList as any],
            title: titleList
        }
        listState.splice(indexList, 1, newList)
        this.setState({
            lists: listState
        })
    }

    saveToLocalStorage(params: string): void {
        const localVar = JSON.parse(localStorage.getItem(params) as string)
        if (!localVar) {
            localStorage.setItem(params, JSON.stringify(this.state[params]))
        } else {
            this.setState({
                [params]: localVar
            })
        }
    }
    saveToLocalStorageTruly(params: string): void {
        localStorage.setItem(params, JSON.stringify(this.state[params]))
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
                            <Board addNewCard={this.addNewCard} changeTitleList={this.changeTitleList} lists={lists}/>
                        </Route>
                    </Switch>
                </div>
            </>
        )
    }
}


