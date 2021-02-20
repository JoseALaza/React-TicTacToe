import React from 'react';

export function ListItem(props) {
    const name = props.name
    return <li> {name} </li>;
}