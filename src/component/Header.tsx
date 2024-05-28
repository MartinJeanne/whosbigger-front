import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

type HeaderProps = {
    isUserRight: boolean | undefined;
    handleNext: () => void;
    handleLoose: () => void;
};

export default function Header({ isUserRight, handleNext, handleLoose }: HeaderProps) {
    const userLife = useRef<number>(3);
    const [userLifeATH, setUserLifeATH] = useState<string>('❤️❤️❤️');
    const [bgColor, setBgColor] = useState<string>('white');
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        setBgColor('white');
        if (isUserRight === true) {
            setBgColor('#85fca9');
            setScore(st => st += 1);
        }
        else if (isUserRight === false) {
            setBgColor('#fc8585');
            userLife.current--;
            refreshUsersLifeATH();
        }
    }, [isUserRight, handleLoose]);

    function refreshUsersLifeATH() {
        let totalLifeDisplay = '';
        for (let i = 0; i < userLife.current; i++) {
            totalLifeDisplay += '❤️';
        }
        setUserLifeATH(totalLifeDisplay);
    }

    function next() {
        if (isUserRight === undefined) return;
        if (userLife.current <= 0) {
            setScore(0);
            userLife.current = 3;
            refreshUsersLifeATH();
            handleLoose();
        }
        handleNext();
    }


    return (
        <header className='header' style={{ background: bgColor }}>
            <Link className='question' to="/">Who's bigger?</Link>
            <div className='awnser-and-next'>
                <div>{userLifeATH}</div>
                <div className='user-answer'>Score: {score}</div>
                <button
                    className='next-button'
                    onClick={() => next()}>
                    Next
                </button>
            </div>
        </header>
    );
}