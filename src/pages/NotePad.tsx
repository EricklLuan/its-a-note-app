import accountCircle from '../assets/images/account_circle.svg';
import plusIcon from '../assets/images/plus.svg'

import '../styles/notepad.scss';

export function NotePad() {
    return (
        <div id='container'>
            <header>
                <nav>
                    <div id='user-information'>
                        <img src={accountCircle} alt="" />
                        <div>
                            <span id='user-name'>Erick Luan</span>
                            <span id='user-email'>flinprice1308ft@gmail.com</span>
                        </div>
                    </div>
                    <button>
                        <img src={plusIcon} alt="" />
                    </button>
                </nav>
            </header>
            <main>
                <h1>
                    The canvas is empty!
                </h1>
                <p>
                    Click on the “+” icon in the upper right corner of the page to add a new note
                </p>
            </main>
        </div>
    );
}