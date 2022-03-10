import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

import accountCircle from '../assets/images/account_circle.svg';
import plusIcon from '../assets/images/plus.svg'

import '../styles/notes.scss';

export function Notes() {
    const { user } = useContext(AuthContext);

    return (
        <div id='container'>
            <header>
                <nav>
                    <div id='user-information'>
                        <img src={user === undefined ? accountCircle : String(user.avatar)} alt="User icon"/>
                        <div>
                            <span id='user-name'>{user?.name}</span>
                            <span id='user-email'>{user?.email}</span>
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
                    Click on the “+” icon in the upper right corner of the page to add a new <strong>note</strong>
                </p>
            </main>
        </div>
    );
}