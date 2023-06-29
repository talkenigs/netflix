import { ArrowBackOutlined } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import './watch.scss';
import YouTube from 'react-youtube';


const Watch = () => {
    const location = useLocation();
    const movie = location.state;

    const opts = {
        playerVars: {
          autoplay: 1,
        },
    }

    return (
        <div className="watch">
            <Link to="/">
                <div className="back">
                    <ArrowBackOutlined />
                    Home
                </div>
            </Link>
            <YouTube videoId={movie.trailer} opts={opts} />

        </div>
    );
};

export default Watch;
