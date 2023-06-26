import {
    Add,
    PlayArrow,
    ThumbDownOutlined,
    ThumbUpOutlined
} from '@material-ui/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './listItem.scss';

const ListItem = ({ index, item }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [movie, setMovie] = useState({});

    // const trailer =
    // 'https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761';

    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await axios.get('movies/find/' + item, {
                    headers: {
                        token:
                            'Bearer ' +
                            JSON.parse(localStorage.getItem('user')).accessToken
                    }
                });
                setMovie(res.data);
            } catch (err) {
                console.log(err, item);
            }
        };
        getMovie();
    }, [item]);

    return (
        // <button
        //     style={{ background: 'none', padding: '0' }}
        //     onClick={() => navigate('/watch', { movie: movie })}
        // >
        <Link to="/watch" state={movie}>
            <div
                className="listItem"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
            >
                <img
                    src={movie.img}
                    alt=""
                />
                {isHovered && (
                    <>
                        <video src={movie.trailer} autoPlay={true} loop></video>
                        <div className="itemInfo">
                            <div className="icons">
                                <PlayArrow className="icon" />
                                <Add className="icon" />
                                <ThumbUpOutlined className="icon" />
                                <ThumbDownOutlined className="icon" />
                            </div>
                            <div className="itemInfoTop">
                                <span>{movie.duration}</span>
                                <span className="limit">{movie.limit}+</span>
                                <span>{movie.year}</span>
                            </div>
                            <div className="desc">{movie.desc}</div>
                            <div className="genre">{movie.genre}</div>
                        </div>
                    </>
                )}
            </div>
        </Link>
    );
};

export default ListItem;
