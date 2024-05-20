import '../css/Header.css';

type HeaderProps = {
    userAwnser: string;
};

export default function Header({ userAwnser }: HeaderProps) {
    let bgColor = 'white';
    if (userAwnser === 'Correct ✅') {
        bgColor = '#85fca9';
    } else if (userAwnser === 'Wrong ❌') {
        bgColor = '#fc8585';
    }

    return (
        <header className='header' style={{background: bgColor}}>
            <div className='question'>Who's bigger?</div>
            <div className='awnser-and-next'>
                <div className='user-answer'>
                    {userAwnser}
                </div>
                <button className='next-button' onClick={() => location.reload()}>Next</button>
            </div>
        </header>
    );
}