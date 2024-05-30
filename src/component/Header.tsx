import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

import "primereact/resources/themes/lara-light-blue/theme.css";
import { Dropdown } from 'primereact/dropdown';

type HeaderProps = {
    isUserRight: boolean | undefined;
    handleNext: (difficulty: string) => void;
    handleLoose: () => void;
};

export default function Header({ isUserRight, handleNext, handleLoose }: HeaderProps) {
    const userLife = useRef<number>(3);
    const [userLifeATH, setUserLifeATH] = useState<string>('❤️❤️❤️');
    const [bgColor, setBgColor] = useState<string>('white');
    const [score, setScore] = useState<number>(0);
    const [selectedDifficulty, setSelectedDifficulty] = useState({ name: 'Medium', code: 'medium' });

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
            resetGame();
            handleLoose();
        }
        handleNext(selectedDifficulty.code);
    }

    function handleDifficultyChanged(diff: any) {
        setSelectedDifficulty(diff.value);
        resetGame();
        handleNext(selectedDifficulty.code);
    }

    function resetGame() {
        setScore(0);
        userLife.current = 3;
        refreshUsersLifeATH();
    }

    const difficulties = [
        { name: 'Easy', code: 'easy' },
        { name: 'Medium', code: 'medium' },
        { name: 'Hard', code: 'hard' }
    ];

    return (
        <header className='header' style={{ background: bgColor }}>
            <Link className='question' to="/">Who's bigger?</Link>

            <div className='awnser-and-next'>
                <div>{userLifeATH}</div>
                <div className='user-answer'>Score: {score}</div>
                <Dropdown value={selectedDifficulty} onChange={diff => handleDifficultyChanged(diff)} options={difficulties} optionLabel="name"
                    placeholder='Easy' className="dropdown w-full md:w-14rem" />
                <button
                    className='next-button'
                    onClick={() => next()}>
                    Next
                </button>
            </div>
        </header>
    );
}