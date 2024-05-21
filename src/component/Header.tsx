import { useState, useRef, useEffect } from 'react';
import '../css/Header.css';

type HeaderProps = {
    userAwnser: string;
    handleNext: () => void;
};

export default function Header({ userAwnser, handleNext }: HeaderProps) {
    const userLife = useRef<number>(3);
    const [userLifeDisplay, setUserLifeDisplay] = useState<string>('❤️❤️❤️');
    const [bgColor, setBgColor] = useState<string>('white');

    useEffect(() => {
        setBgColor('white');
        if (userAwnser === 'Correct ✅') setBgColor('#85fca9');
        else if (userAwnser === 'Wrong ❌') {
            setBgColor('#fc8585');
            userLife.current--;
            
            let totalLifeDisplay = '';
            for (let i = 0; i < userLife.current; i++) {
                totalLifeDisplay += '❤️';
            }
            setUserLifeDisplay(totalLifeDisplay);
        }
    }, [userAwnser]);


    return (
        <header className='header' style={{ background: bgColor }}>
            <div className='question'>Who's bigger?</div>
            <div className='awnser-and-next'>
                <div>{userLifeDisplay}</div>
                <div className='user-answer'>{userAwnser}</div>
                <button
                    className='next-button'
                    onClick={() => handleNext()}>
                    Next
                </button>
            </div>
        </header>
    );
}