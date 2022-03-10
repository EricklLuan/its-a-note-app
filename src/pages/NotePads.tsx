import { AuthContext } from '../contexts/AuthContext';
import { useContext, useState } from 'react';

import { Modal } from '../components/Modal';

import accountCircle from '../assets/images/account_circle.svg';
import plusIcon from '../assets/images/plus.svg'

import '../styles/notepads.scss';

export function NotePads() {
    const [ modalVisible, setModalVisible ] = useState<boolean>(false);
    const { user } = useContext(AuthContext);

    function handleImageError(event: any) {
        event.target.src = accountCircle;
    }   

    return (
        <div id='container'>
            <header>
                <nav>
                    <div id='user-information'>
                        <img src={user === undefined ? accountCircle : String(user.avatar)} alt="User icon" onError={handleImageError}/>
                        <div>
                            <span id='user-name'>{user?.name}</span>
                            <span id='user-email'>{user?.email}</span>
                        </div>
                    </div>
                    <button onClick={() => setModalVisible(!modalVisible)}>
                        <img src={plusIcon} alt="" />
                    </button>
                </nav>
            </header>
            
            <main>
                <h1>
                    The canvas is empty!
                </h1>
                <p>
                    Click on the “+” icon in the upper right corner of the page to add a new <strong>notepad</strong>
                </p>
            </main>

            <Modal visible={modalVisible} setState={setModalVisible}>
                <h1>New NotePad</h1>
            </Modal>
        </div>
    );
}