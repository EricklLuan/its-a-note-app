import { ReactElement } from "react";

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
        <div id="main-container">
           {props.children}
        </div>
    );
}