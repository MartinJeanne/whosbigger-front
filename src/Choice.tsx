import './App.css';

type ChoiceProps = {
    name: string;
    data: number;
    isCorrectAwnser: boolean;
    handleClick: (isUserAwnserCorrect: boolean) => void;
};

export default function Choice({ name, data, isCorrectAwnser, handleClick }: ChoiceProps) {

    return (
        <div className='half' onClick={() => { handleClick(isCorrectAwnser) }}>
            <div>{name}</div>
            <div>{data}</div>
        </div>
    );
}
