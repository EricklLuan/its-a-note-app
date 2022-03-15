import { ReactNode } from "react"
import ReactDOM from "react-dom"

import '../styles/modal.scss'

let ConfirmModal = {
    open: (Element: ReactNode, onComfirm?: Function) => {
        ReactDOM.render((
            <div id='modal'>
                <div id="content">
                    {Element}
                </div>
            </div>
        ), document.getElementById('root'))
    },
}

export { ConfirmModal }