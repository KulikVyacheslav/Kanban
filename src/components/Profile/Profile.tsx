import React, {} from "react";
import './Profile.scss';
import {IProfile} from "../../interfaces/interfaces";

interface ProfileProps {
    profile: IProfile,
    changeProfileName(name: string): void
}

export const Profile: React.FC<ProfileProps> = ({profile, changeProfileName}) => {

    const handlerChangeName = (ev: React.FormEvent<HTMLTextAreaElement>) => {
        if (ev.currentTarget.value === '') {
            changeProfileName('empty');
            //TODO
        } else {
            changeProfileName(ev.currentTarget.value);
        }

    };

    return (<div className="profile">
        <div className="profile__name">
            <h1>Name:</h1>
            <textarea
                onChange={handlerChangeName}
                className="profile__name-view"
                value={profile.name}
            />
        </div>

    </div>);
};