import { useState, useRef, useEffect } from 'react';
import '../css/Header.css';

type HeaderProps = {
    userAwnser: string;
    handleNext: () => void;
    handleLoose: () => void;
};

export default function Header({ userAwnser, handleNext, handleLoose }: HeaderProps) {
    const userLife = useRef<number>(3);
    const [userLifeATH, setUserLifeATH] = useState<string>('❤️❤️❤️');
    const [bgColor, setBgColor] = useState<string>('white');
    const [score, setScore] = useState<number>(0);

    useEffect(() => {
        setBgColor('white');
        if (userAwnser === 'Correct ✅') {
            setBgColor('#85fca9');
            setScore(st => st += 1);
        }
        else if (userAwnser === 'Wrong ❌') {
            setBgColor('#fc8585');
            userLife.current--;
            refreshUsersLifeATH();
        }
    }, [userAwnser, handleLoose]);

    function refreshUsersLifeATH() {
        let totalLifeDisplay = '';
        for (let i = 0; i < userLife.current; i++) {
            totalLifeDisplay += '❤️';
        }
        setUserLifeATH(totalLifeDisplay);
    }

    function next() {
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
            <div className='question'>Who's bigger?</div>
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