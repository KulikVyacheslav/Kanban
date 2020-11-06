import React from 'react';
import {Layout} from "./components/Layout";
import {Navbar} from "./components/Navbar";
import { Redirect, Route, Switch } from "react-router-dom";


export const App = () => {



    return (
        <>
            <Navbar/>
            <div className="content">
                <Switch>
                    <Route exact path="/board">
                        <Layout />
                    </Route>
                    <Route exact path="/cards/:id">
                        <Layout />
                    </Route>
                    {/*<Route path="/profile">*/}
                    {/*    <Profile changeProfileName={this.handlerName} profile={profile}/>*/}
                    {/*</Route>*/}
                    <Route path="*">
                        <Redirect to="/board"/>
                    </Route>
                </Switch>
            </div>

        </>

        // <Layout/>


    );
};