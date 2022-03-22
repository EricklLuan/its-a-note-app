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

type ModalEmptyProps = {
    visible: boolean;
    setState: Function;
    children?: ReactNode;
}

export function ModaConfirm(props: ModalConfirmProps) {
    
    document.body.classList.remove('noscroll')
    if (props.visible === false) return null;
    document.body.classList.add('noscroll')

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

export function ModalEmpty(props: ModalEmptyProps) {
    
    document.body.classList.remove('noscoroll')
    if (props.visible === false) return null;
    document.body.classList.add('noscroll')
    
    function closeModal(event: any) {
        if (event.currentTarget === event.target) props.setState(false);
    }

    return(
        <div className="modal" onClick={closeModal}>
            <div id="content">
                {props.children}
            </div>
        </div>
    )
}