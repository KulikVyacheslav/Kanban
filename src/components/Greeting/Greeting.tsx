import React, {useState} from 'react';
import './Greeting.scss';
import {useDispatch} from "react-redux";
import { changeName } from 'ducks/Profile/profileSlice';


interface GreetingProps {

}

export const Greeting: React.FC<GreetingProps> = () => {

    const dispatch = useDispatch();

    const [name, setName] = useState<string>('');

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName( prevState => {
            return prevState = event.target.value;
        });
    };
    const handlerSave = (event: React.MouseEvent) => {
        event.preventDefault();
        dispatch(changeName(name));
    };

    return (
        <div className='greeting'>
            <div className='greeting__content'>
                <form className='greeting__form'>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            onChange={handleInput}
                            placeholder="Your name"/>
                    </div>
                    <button onClick={handlerSave} className="btn btn-primary">Save</button>
                </form>
            </div>
        </div>
    );
};