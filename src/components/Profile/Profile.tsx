import React, {} from "react";
import './Profile.scss';
import {useDispatch, useSelector} from "react-redux";
import {changeName, selectProfile} from "./redux/profileSlice";

interface ProfileProps {
    //profile: IProfile,
    //changeProfileName(name: string): void
}

export const Profile: React.FC<ProfileProps> = () => {

    const profile = useSelector(selectProfile);
    const dispatch = useDispatch();

    const handlerChangeName = (ev: React.FormEvent<HTMLTextAreaElement>) => {
        if (ev.currentTarget.value === '') {
            dispatch(changeName('empty'));
            //TODO
        } else {
            dispatch(changeName(ev.currentTarget.value));
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