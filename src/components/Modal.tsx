import { ReactNode } from 'react';
import '../styles/modal.scss'

type ModalConfirmProps = {
    title: string;
    message?: string;
    visible: boolean;
    setState: Function;
    onConfirm: Function;
    onDeny: Function;
}

type ModalOkProps = {
    title: string;
    message?: string;
    visible: boolean;
    setState: Function;
    onOK: Function;
}

type ModalEmptyProps = {
    visible: boolean;
    setState: Function;
    children?: ReactNode;
}

export function ModalEmpty(props: ModalEmptyProps) {
    if (!props.visible && document.getElementsByClassName("modal").length) document.body.classList.remove('noscroll');
    if (!props.visible) return null;
    document.body.classList.add('noscroll');
    
    function closeModal(event: any) {
        if (event.currentTarget === event.target) props.setState(false);
    }

    return(
        <div className="modal" onClick={closeModal} style={ { bottom: window.screenTop, right: window.screenLeft } }>
            <div id="content">
                {props.children}
            </div>
        </div>
    )
}

export function ModaConfirm(props: ModalConfirmProps) {
    if (!props.visible && document.getElementsByClassName("modal").length) document.body.classList.remove('noscroll')
    if (!props.visible) return null;
    document.body.classList.add('noscroll');

    function closeModal(event: any) {
        if (event.currentTarget === event.target) props.setState(false);
    }

    return(
        <div className="modal" onClick={closeModal} style={ { bottom: window.screenTop, right: window.screenLeft } }>
            <div id="confirm-content">
                <div id="modal-text">
                    <h1>{props.title}</h1>
                    <p>{props.message}</p>
                </div>
                <div id="modal-buttons">
                    <button onClick={() => {
                        props.onDeny()
                        props.setState(false)
                    }}>No</button>
                    <button onClick={() => {
                        props.onConfirm()
                        props.setState(false)
                    }}>Yes</button>
                </div>
            </div>
        </div>
    )
}
