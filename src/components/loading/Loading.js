import React from 'react';
import './Loading.scss';

export default class Header extends React.Component {
    constructor() {
        super();
    }

    render() {
        return <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
    }
}
