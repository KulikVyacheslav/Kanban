import React, {useEffect} from 'react';
import {Layout} from "./components/Layout";
import {Redirect, Route, Switch} from "react-router-dom";
import {Greeting} from "./components/Greeting";
import {Profile} from "./components/Profile";
import {Board} from "./components/Board";
import {useDispatch, useSelector} from "react-redux";
import {fetchAllComments, selectProfile} from "./ducks";


export const App = () => {

    const profile = useSelector(selectProfile);
    const dsipatch = useDispatch();
    useEffect( () => {
        dsipatch(fetchAllComments());
    });

    return (
            <Layout>
                {(profile.name === '' && <Greeting />)}
                <div className="content">
                    <Switch>
                        <Route exact path="/board">
                            <Board />
                        </Route>
                        <Route exact path="/cards/:id">
                            <Board />
                        </Route>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route path="*">
                            <Redirect to="/board"/>
                        </Route>
                    </Switch>
                </div>
            </Layout>
    );
};