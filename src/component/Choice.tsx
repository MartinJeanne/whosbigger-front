import { useState, useEffect } from 'react';
import '../css/Choice.css';

type ChoiceProps = {
    name: string;
    data: number;
    metadata: any;
    isCorrectAwnser: boolean;
    handleClick: (isUserAwnserCorrect: boolean) => void;
    position: number;
};


export default function Choice({ name, data, metadata, isCorrectAwnser, handleClick, position }: ChoiceProps) {
    const [bgImgProperty, setBgImgProperty] = useState('none');

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        setBgImgProperty('none');
        const nameForUrl = name.replace(' ', '_');

        fetch(`${API_URL}/choices/${nameForUrl}/image`)
            .then(response => {
                if (response.ok) return response.json();
            })
            .then(data => setBgImgProperty(`url(${data.image})`))
            .catch(console.error);

    }, [API_URL, name]);

    let dataResult;
    if (data === -1) dataResult = <div className='data'></div>;
    else dataResult = <div className='data'>{data}</div>;

    const bgStyle = {
        left: '',
        right: '',
        top: '10vh',
        backgroundImage: bgImgProperty,
        //backgroundColor: 'red'
    }

    if (position === 1) {
        bgStyle.left = '0';
    }
    else if (position === 2) {
        bgStyle.right = '0';
    }

    return (
        <div className='half' onClick={() => { handleClick(isCorrectAwnser) }}>
            <div className="bg-image" style={bgStyle}></div>
            <div className='metadata'>{metadata.weather}</div>
            <div className='name'>{name}</div>
            {dataResult}
        </div>
    );
}
