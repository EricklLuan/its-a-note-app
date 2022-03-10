import { ReactNode } from 'react';

import '../styles/global.scss'
import '../styles/modal.scss'

type ModalProps = {
    children?: ReactNode;
    visible: boolean;
    setState: Function
}

export function Modal(props: ModalProps) {

    function handleClickOut(event: any) {
        if (event.target === event.currentTarget) {
            props.setState(!props.visible)
        }
    }

    return (
        <div id='modal' className={ props.visible === false ? 'hidden' : '' } onClick={handleClickOut}>
            <div id="content" style={{minWidth: `${50}%`}}>
                {props.children}
            </div>
        </div>
    );
}
