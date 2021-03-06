import {IDBoardState} from "../types/types";

export interface ToggleAddButton {
    state: boolean,
    id: IDBoardState;
}


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
    title: string,
    description: string,
}

export interface IComments {
    author: string,
    id: string,
    idCard: string,
    text: string
}


export interface RenderLists {
    (id: string,
     list: ILists,
     cardsCurrentList: Array<ICards>): void

}
export interface RenderCards {
    (commentsCurrentCard: Array<IComments>,
     cardId: string,
     card: ICards): void
}
export interface RenderComments {
    (commentsLength: number): void
}

export interface RenderCommentsModal {
    (commentId: string,
     comment: IComments): void
}

export interface RootStateI {
    lists: Array<ILists>,
    cards: Array<ICards>,
    comments: ICommentsState,
    profile: IProfile
}

export interface ICommentsState {
    comments: IComments[],
    loading: boolean,
    error: object
}