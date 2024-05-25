import { useState, useEffect } from 'react';
import '../css/Choice.css';

type ChoiceProps = {
    name: string;
    data: number;
    metadata: any;
    isCorrectAwnser: boolean;
    handleClick: (isUserAwnserCorrect: boolean) => void;
};


export default function Choice({ name, data, metadata, isCorrectAwnser, handleClick }: ChoiceProps) {
    const [imgUrl, setImgUrl] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        fetch(`${API_URL}/choices/${name}/image`)
            .then(response => response.json())
            .then(data => setImgUrl(data.image))
            .catch(console.error);

    }, [API_URL, name]);

    const halfStyle = {
        backgroundImage: imgUrl ? `url(${imgUrl})` : 'none',
    };

    let dataResult;
    if (data == -1) dataResult = <div className='data'></div>;
    else dataResult = <div className='data'>{data}</div>;

    return (
        <div className='half' style={halfStyle} onClick={() => { handleClick(isCorrectAwnser) }}>
            <div className='metadata'>{metadata.weather}</div>
            <div className='name'>{name}</div>
            {dataResult}
        </div>
    );
}
