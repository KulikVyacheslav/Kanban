import React, {} from 'react';
import {Navbar} from '../Navbar';
import './Layout.scss';


export class Layout extends React.Component<any, any> {
    render() {
        return (
            <>
                <Navbar/>
                {this.props.children}
            </>
        );
    }
}

