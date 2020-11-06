import React, {useCallback, useEffect, useState} from 'react';
import {Layout} from "./components/Layout";
import {Navbar} from "./components/Navbar";
import { Redirect, Route, Switch } from "react-router-dom";
import {IProfile} from "./interfaces/interfaces";
import {nanoid} from 'nanoid';
import {Greeting} from "./components/Greeting";
import {Profile} from "./components/Profile";


export const App = () => {

        const [profile, setProfile] = useState<IProfile>({
            name: '',
            id: nanoid()
        });

    const handlerName = useCallback((name: string): void => {
        setProfile((profile) => {
            return {
                ...profile,
                name,
            };
        });
    }, []);

    useEffect(() => {
        const localVar = JSON.parse(localStorage.getItem('profile') as string);
        if (!localVar) {
            localStorage.setItem('profile', JSON.stringify(profile));
        } else {
            setProfile(localVar);
        }



    }, []);

    useEffect( () => {
        if(profile.name !== '') {
            localStorage.setItem('profile', JSON.stringify(profile));
        }

    },  [profile]);

    return (
        <>
            <Navbar/>
            {(profile.name === '' && <Greeting handlerName={handlerName}/>)}
            <div className="content">
                <Switch>
                    <Route exact path="/board">
                        <Layout profileName={profile.name}/>
                    </Route>
                    <Route exact path="/cards/:id">
                        <Layout profileName={profile.name}/>
                    </Route>
                    <Route path="/profile">
                        <Profile changeProfileName={handlerName} profile={profile}/>
                    </Route>
                    <Route path="*">
                        <Redirect to="/board"/>
                    </Route>
                </Switch>
            </div>

        </>

        // <Layout/>


    );
};