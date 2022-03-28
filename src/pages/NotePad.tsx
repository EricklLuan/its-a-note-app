// OUTRO
import { useContext, useState } from 'react';

// Database
import { push, ref, remove, update } from 'firebase/database';
import { database } from '../services/firebase';

// Icons
import accountCircle from '../assets/images/account_circle.svg';
import deleteIcon from '../assets/images/delete.svg';
import editIcon from '../assets/images/edit.svg';
import plusIcon from '../assets/images/plus.svg';

// Components
import { ModaConfirm, ModalEmpty } from '../components/Modal';
import { AuthContext } from '../contexts/AuthContext';
import { Note } from '../components/Note';

// Hooks
import { useNotes } from '../hooks/useNotes';

// Styles
import '../styles/notepad.scss';

export function NotePad() {

    const [userNoteInfo, setUserNoteInfo] = useState([] as any);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);
    const [noteContent, setNoteContent] = useState('');
    const [noteTitle, setNoteTitle] = useState('');

    const { user } = useContext(AuthContext);

    const notes = useNotes();

    function handleImageError(event: any) {event.target.src = accountCircle;}

    function handleChangeColor(event: any) {
        event.target.offsetParent.firstChild.firstChild.style = `background: ${event.currentTarget.name}`
    }

    async function handleNoteForm(event: any) {
        event.preventDefault();

        if (!user && noteTitle.trim() === "") return;
        const dbref = ref(database, `users/${user?.id}/notes`);
        
        push(dbref, {
            title: noteTitle,
            content: noteContent,
            color: event.target.parentNode.parentNode.previousSibling.style.background,
            date: new Date().toString()
        })

        setNoteTitle("");
        setNoteContent("");
    }

    async function handleEditNote(event: any) {
        update(ref(database, `users/${user?.id}/notes/${userNoteInfo[0]}`), {
            title: noteTitle,
            content: noteContent,
            color: event.target.parentNode.parentNode.previousSibling.style.background,
            date: new Date().toString()
        })

        setNoteTitle("");
        setNoteContent("");
        setUserNoteInfo([]);
    }

    async function handleDeleteNote(noteId: string) {
        remove(ref(database, `users/${user?.id}/notes/${noteId}`))
        setUserNoteInfo([])
        setShowFormModal(false)
    }

    return (
        <div id='container'>
            <header id='nav'>
                <nav>
                    <div id='user-information'>
                        <img src={user === undefined ? accountCircle : String(user.avatar)} alt="User icon" onError={handleImageError} />
                        <div>
                            <span id='user-name'>{user?.name}</span>
                            <span id='user-email'>{user?.email}</span>
                        </div>
                    </div>
                    <button onClick={() => setShowFormModal(true)}>
                        <img src={plusIcon} alt="" />
                    </button>
                    <ModalEmpty visible={showFormModal} setState={setShowFormModal}>
                        <header id="modal-header" style={{ background: "#8C8627" }}>
                            <h1 className="title" >New Note</h1>
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
                                <input type="text" onChange={event => setNoteTitle(event.target.value)} />
                            </div>
                            <div id="text-area-container">
                                <span>Content</span>
                                <textarea onChange={event => setNoteContent(event.target.value)}></textarea>
                            </div>
                            <div id="text-buttons-container">
                                <button type='button' onClick={() => setShowFormModal(false)}>Cancel</button>
                                <button type="submit" onClick={(event: any) => {
                                    handleNoteForm(event)
                                    setShowFormModal(false)
                                }}>Send</button>
                            </div>
                        </form>
                    </ModalEmpty>
                </nav>
            </header>

            {!notes.length ? (
                <main id='no-notepads'>
                    <h1>The canvas is empty!</h1>
                    <p>Click on the “+” icon in the upper right corner of the page to add a new <strong>notepad</strong></p>
                </main>
            ) : (
                <main id='notepads'>
                    {notes.map((note) => (
                        <Note key={note.id}>
                            <>
                                <header style={{ background: `${note.color}` }}>
                                    <div id="header-text">
                                        <h1>{note.title}</h1>
                                        <span>{new Date(note.date).toLocaleString()}</span>
                                    </div>
                                    <div id="header-buttons">
                                        <button style={{ background: `${note.color}` }}
                                            onClick={() => {
                                                setUserNoteInfo([note.id, note.title, note.content, note.color]);
                                                setShowEditModal(true);
                                            }}
                                        >
                                            <img src={editIcon} alt="" />
                                        </button>

                                        <button onClick={() => {
                                            setUserNoteInfo([note.id])
                                            setShowDeleteModal(true)
                                        }} style={{ background: `${note.color}` }}>
                                            <img src={deleteIcon} alt="" />
                                        </button>
                                    </div>
                                </header>
                                <main><p>{note.content}</p></main>
                            </>
                        </Note>
                    ))}
                    <ModalEmpty visible={showEditModal} setState={setShowEditModal}>
                        <header id="modal-header" style={{ background: `${userNoteInfo[3]}` }}>
                            <h1 className="title">Edit Note</h1>
                        </header>
                        <form onSubmit={() => handleEditNote(userNoteInfo)}>
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
                                    defaultValue={userNoteInfo[1]} 
                                    onInput={(event: any) => setNoteTitle(event.target.value)} 
                                />
                            </div>
                            <div id="text-area-container">
                                <span>Content</span>
                                <textarea 
                                    defaultValue={userNoteInfo[2]} 
                                    onSubmit={(event: any) => console.log(event.target.value)}
                                >
                                </textarea>
                            </div>
                            <div id="text-buttons-container">
                                <button type='button' onClick={() => setShowEditModal(false)}>Cancel</button>
                                <button type='submit' onClick={(event: any) => {
                                    handleEditNote(event)
                                    setShowEditModal(false)
                                }}>Send</button>
                            </div>
                        </form>
                    </ModalEmpty>
                    <ModaConfirm
                        title="Warning!"
                        message="After confirming there is no 
                                 turning back, all the note will 
                                 be lost. Are you sure you want 
                                 to delete the note?"
                        visible={showDeleteModal}
                        setState={setShowDeleteModal}
                        onConfirm={() => { handleDeleteNote(userNoteInfo[0]) }}
                        onDeny={() => { setShowDeleteModal(false) }}
                    />
                </main>
            )}
        </div>
    );
}