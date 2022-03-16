
import '../styles/modal.scss'

type ModalProps = {
    title: string;
    message?: string;
    visible: boolean;
    setState: Function;
}

export function ModaConfirm(props: ModalProps) {
    if (props.visible === false) return null;

    function closeModa(event: any) {

    }

    return(
        <div id="modal" onClick={(event: any) => { props.setState(false)}}>
            <div id="content">
                <div id="modal-text">
                    <h1>{props.title}</h1>
                    <p>{props.message}</p>
                </div>
                <div id="modal-buttons">
                    <button>No</button>
                    <button>Yes</button>
                </div>
            </div>
        </div>
    )
}  
