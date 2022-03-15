import { ReactElement } from "react";

import "../styles/note.scss"

type NotePadProps = {
    children?: ReactElement
}

export function Note(props: NotePadProps) {

    return (
        <div id="main-container">
           {props.children}
        </div>
    );
}