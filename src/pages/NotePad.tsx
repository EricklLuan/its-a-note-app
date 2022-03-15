import { AuthContext } from '../contexts/AuthContext';
import { useContext, useState } from 'react';

import { Modal } from '../components/Modal';
import { Note } from '../components/Note';

import accountCircle from '../assets/images/account_circle.svg';
import plusIcon from '../assets/images/plus.svg'
import editIcon from '../assets/images/edit.svg'
import deleteIcon from '../assets/images/delete.svg'

import { push, ref } from 'firebase/database';
import { database } from '../services/firebase';

import { useNotes } from '../hooks/useNotes';

import '../styles/notepad.scss';

import { ConfirmModal } from '../components/ConfirmModal';

export function NotePad() {
    
    const [ deleteModalVisible, setDeleteModalVisible ] = useState(false);
    const [ modalVisible, setModalVisible ] = useState(false);

    const [ noteContent, setNoteContent ] = useState('');
    const [ noteTitle, setNoteTitle ] = useState('');
    
    const { user } = useContext(AuthContext);

    const notes = useNotes();
    
    function handleImageError(event: any) {
        event.target.src = accountCircle;
    }   

    function handleChangeColor(event: any) {
        event.target.offsetParent.firstChild.firstChild.style = `background: ${event.target.name}`
    }

    async function handleNoteForm(event: any) {
        event.preventDefault();
        
        if (user && noteTitle.trim() !== "") {
            const dbref = ref(database, `users/${user.id}/notes`);
            
            push(dbref, {
                title: noteTitle,
                content: noteContent,
                color: event.target.previousSibling.style.backgroundColor,
                date: new Date().toString()
            })

            setNoteTitle("");
            setNoteContent("");
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
                    <h1>The canvas is empty!</h1>
                    <p>Click on the “+” icon in the upper right corner of the page to add a new <strong>notepad</strong></p>
                </main>
            ) : (
                <main id='notepads'>
                    {notes.map((note) => {
                        return (
                            <Note key={note.id}>
                                 <>
                                    <header style={{background: `${note.color}`}}>
                                        <div id="header-text">
                                            <h1>{note.title}</h1>
                                            <span>{new Date(note.date).toLocaleString()}</span>
                                        </div>
                                        <div id="header-buttons">
                                            <button style={{background: `${note.color}`}}><img src={editIcon} alt="" /></button>
                                            <button onClick={() => ConfirmModal.open(<h1></h1>)} style={{background: `${note.color}`}}>
                                                <img src={deleteIcon} alt="" />
                                            </button>
                                        </div>
                                    </header>
                                    <main>
                                        <p>{note.content}</p>
                                    </main>
                                 </>
                            </Note>
                        )
                    })}
                </main>
            ) }

            <Modal visible={deleteModalVisible} setState={setDeleteModalVisible}>
                <h1>Warning!</h1>
                <p>After confirming there is no turning back, all the note will be lost. Are you sure you want to delete the note?</p>
                <div>
                    <button>No</button>
                    <button>Yes</button>
                </div>
            </Modal>

            <Modal visible={modalVisible} setState={setModalVisible}>
                <header id="modal-header" style={{background: "#8C8627"}}>
                    <h1>New Note</h1>
                </header>
                <form onSubmit={handleNoteForm}>
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
                        <input type="text" value={noteTitle} onChange={event => setNoteTitle(event.target.value)}/>
                    </div>

                    <div id="text-area-container">
                        <span>Content</span>
                        <textarea value={noteContent} onChange={event => setNoteContent(event.target.value)}></textarea>
                    </div>

                    <div id="text-buttons-container">
                        <button type='button' onClick={() => setModalVisible(false)}>Cancel</button>
                        <button type="submit" onClick={() => setModalVisible(false)}>Send</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}