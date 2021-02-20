import React, { useState } from 'react'

export function Square(props) {

    return (<div class="box" id={props.idx} onClick={props.onClick} >{props.val} </div>);
}
