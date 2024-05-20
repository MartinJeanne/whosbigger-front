import '../css/Header.css';

type HeaderProps = {
    userAwnser: string;
};

export default function Header({ userAwnser }: HeaderProps) {
    let answerClass = '';
    if (userAwnser === 'Correct !') {
        answerClass = 'correct';
    } else if (userAwnser === 'Wrong') {
        answerClass = 'wrong';
    }

    return (
        <header className='header'>
            <div className='question'>Who's bigger?</div>
            <div className='awnser-and-next'>
                <div className={`user-answer ${answerClass}`}>
                    {userAwnser}
                </div>
                <button className='next-button' onClick={() => location.reload()}>Next</button>
            </div>
        </header>
    );
}