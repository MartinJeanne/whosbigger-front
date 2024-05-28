import { useParams } from 'react-router-dom';

export default function Map() {
    const { location } = useParams();

    return (
        <div>
            <div>Hey there</div>
            <p>Location: {location}</p>
        </div>
    );
}
