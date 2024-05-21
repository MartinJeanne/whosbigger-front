import { useState, useEffect, useEffectEvent } from 'react';
import '../css/Header.css';

type HeaderProps = {
    userAwnser: string;
    handleNext: Function;
};

export default function Header({ userAwnser, handleNext }: HeaderProps) {
    const [userLife, setUserLife] = useState<string>('❤️❤️❤️');
    const [bgColor, setBgColor] = useState<string>('white');

    const updateUserLife = useEffectEvent(() => {
        console.log(userLife.length);
        setUserLife(userLife.slice(0, -1));
    });

    useEffect(() => {
        function update() {
            setBgColor('white');
            if (userAwnser === 'Correct ✅') setBgColor('#85fca9');
            else if (userAwnser === 'Wrong ❌') {
                setBgColor('#fc8585');
                updateUserLife();
            }
        }

        update();
    }, [userAwnser]);

    return (
        <header className='header' style={{ background: bgColor }}>
            <div className='question'>Who's bigger?</div>
            <div className='awnser-and-next'>
                <div>{userLife}</div>
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