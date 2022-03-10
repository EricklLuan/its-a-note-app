import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import googleIcon from '../assets/images/google_icon.svg'

import '../styles/home.scss'

export function Home() {

    const { user, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();

    async function handleUserSignIn() {
        if (!user) {
            await signInWithGoogle();
        }

        navigate("/user/notepads");
    }

    return (
        <div id='home-container'>
            <header>
                <nav>
                    <button onClick={ handleUserSignIn }>
                        <img src={googleIcon} alt="Google Icon" />
                        Login with google    
                    </button>
                </nav>
            </header>
            <main>
                <h1>
                    It's a note app!
                </h1>
                <p>
                    Click the "login" button at the top right of the page to start creating notes
                </p>
            </main>
        </div>
    );
}