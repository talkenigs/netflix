import { ArrowBackOutlined } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import './watch.scss';

const Watch = () => {
    const location = useLocation();
    const movie = location.state;

    return (
        <div className="watch">
            <Link to="/">
                <div className="back">
                    <ArrowBackOutlined />
                    Home
                </div>
            </Link>
            <video
                className="video"
                autoPlay
                // progress
                controls
                // src="https://youtu.be/8mZ95Qh8GvY"
                src={movie.video}
                // "https://cdn.videvo.net/videvo_files/video/free/2014-06/large_watermarked/Blue_Sky_and_Clouds_Timelapse_0892__Videvo_preview.mp4"
            />
        </div>
    );
};

export default Watch;
