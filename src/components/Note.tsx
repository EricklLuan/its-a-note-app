import { ReactElement } from "react";

import { Modal } from "./Modal";

import editIcon from '../assets/images/edit.svg'
import deleteIcon from '../assets/images/delete.svg'

import "../styles/note.scss"

type NotePadProps = {
    key: string,
    title: string,
    date: string,
    color: string,
    children?: ReactElement
}

export function Note(props: NotePadProps) {

    return (
        <div id="main-container" style={{background: `${props.color}`}}>
            <header>
                <div id="header-text">
                    <h1>{props.title}</h1>
                    <span>{new Date(props.date).toLocaleString()}</span>
                </div>
                <div id="header-buttons">
                    <button style={{background: `${props.color}`}}>
                        <img src={editIcon} alt="" />
                    </button>
                    <button style={{background: `${props.color}`}}>
                        <img src={deleteIcon} alt="" />
                    </button>
                </div>
            </header>
        </div>

    );
}