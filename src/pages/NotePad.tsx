import { AuthContext } from '../contexts/AuthContext';
import { useContext, useState } from 'react';

import { Modal } from '../components/Modal';
import { Note } from '../components/Note';

import accountCircle from '../assets/images/account_circle.svg';
import plusIcon from '../assets/images/plus.svg'

import { push, ref } from 'firebase/database';
import { database } from '../services/firebase';

import { useNotes } from '../hooks/useNotes';

import '../styles/notepad.scss';


export function NotePad() {
    
    const [ deleteModalVisible, setDeleteModalVisible ] = useState(false);
    const [ modalVisible, setModalVisible ] = useState(false);
    const [ notepadTitle, setNotepadTitle ] = useState('');
    
    const { user } = useContext(AuthContext);

    const notes = useNotes();
    
    function handleImageError(event: any) {
        event.target.src = accountCircle;
    }   

    function handleChangeColor(event: any) {
        event.target.offsetParent.firstChild.firstChild.style = `background: ${event.target.name}`
    }

    async function handleNotepadForm(event: any) {
        event.preventDefault();
        
        if (user && notepadTitle.trim() !== "") {
            const dbref = ref(database, `users/${user.id}/notepads`);
            
            push(dbref, {
                title: notepadTitle,
                color: event.target.previousSibling.style.backgroundColor,
                date: new Date().toString()
            })

            setNotepadTitle("");
        }
    }

    return (
        <div id='container'>
            <header id='nav'>
                <nav>
                    <div id='user-information'>
                        <img src={user === undefined ? accountCircle : String(user.avatar)} alt="User icon" onError={handleImageError}/>
                        <div>
                            <span id='user-name'>{user?.name}</span>
                            <span id='user-email'>{user?.email}</span>
                        </div>
                    </div>
                    <button onClick={() => setModalVisible(true)}>
                        <img src={plusIcon} alt="" />
                    </button>
                </nav>
            </header>
            
            { !notes.length ? (
                <main id='no-notepads'>
                    <h1>
                        The canvas is empty!
                    </h1>
                    <p>
                        Click on the “+” icon in the upper right corner of the page to add a new <strong>notepad</strong>
                    </p>
                </main>
            ) : (
                <main id='notepads'>
                    {notes.map((note) => {
                        return (
                            <Note
                                key={note.id} 
                                title={note.title}
                                color={note.color}
                                date={note.date}
                            />
                        )
                    })}
                </main>
            ) }

            <Modal visible={modalVisible} setState={setModalVisible}>
                <header id="modal-header" style={{background: "#8C8627"}}>
                    <h1>New NotePad</h1>
                </header>
                <form onSubmit={handleNotepadForm}>
                    <div id="colors-buttons-container">
                        <span>Color</span>
                        <div>
                            <button className='colors-button' type='button' name='#592723' onClick={handleChangeColor}></button>
                            <button className='colors-button' type='button' name='#BF6849' onClick={handleChangeColor}></button>
                            <button className='colors-button' type='button' name='#D9923B' onClick={handleChangeColor}></button>
                            <button className='colors-button' type='button' name='#8C8627' onClick={handleChangeColor}></button>
                        </div>
                    </div>
                    <div id="text-input-container">
                        <span>Text</span>
                        <input
                            type="text"
                            value={notepadTitle}
                            onChange={event => setNotepadTitle(event.target.value)}
                        />
                    </div>
                    <div id="text-buttons-container">
                        <button onClick={() => setModalVisible(false)}>Cancel</button>
                        <button type="submit" onClick={() => {setModalVisible(false)}}>Send</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}