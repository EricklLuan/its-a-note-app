
import googleIcon from '../assets/images/google_icon.svg'
import '../styles/home.scss'

export function Home() {
    return (
        <div id='home-container'>
            <header>
                <nav>
                    <button>
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