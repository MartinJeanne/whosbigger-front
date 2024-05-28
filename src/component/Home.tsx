import { Link } from 'react-router-dom';
import '../css/Home.css';

export default function Home() {
    return (
        <div className="Home">
            <header className="Home-header">
                <h1>Who's bigger?</h1>
                <div>the game</div>
            </header>

            <div className="buttons">
                <Link className='button ' to="/play">Play</Link>
                <Link className='button disable' to="/leaderboard">Leaderboard</Link>
                <Link className='button disable' to="/about">About</Link>
            </div>
        </div>
    );
}
