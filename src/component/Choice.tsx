import '../css/Choice.css';

type ChoiceProps = {
    name: string;
    data: number;
    isCorrectAwnser: boolean;
    handleClick: (isUserAwnserCorrect: boolean) => void;
};

export default function Choice({ name, data, isCorrectAwnser, handleClick }: ChoiceProps) {
    let dataResult;
    if (data == -1) dataResult = <div className='dataResult'></div>;
    else dataResult = <div className='dataResult'>{data}</div>;

    return (
        <div className='half' onClick={() => { handleClick(isCorrectAwnser) }}>
            <div>{name}</div>
            {dataResult}
        </div>
    );
}
