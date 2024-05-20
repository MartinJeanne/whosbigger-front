import '../css/Header.css';

type HeaderProps = {
    userAwnser: string;
};

export default function Header({ userAwnser }: HeaderProps) {
    return (
        <div className='questionContainer'>
            <div>Who's bigger?</div>
            <div>{userAwnser}</div>
            <button onClick={() => location.reload()}>Next</button>
        </div>
    );
}
