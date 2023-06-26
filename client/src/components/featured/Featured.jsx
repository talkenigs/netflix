import './featured.scss';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { InfoOutlined, PlayArrow } from '@material-ui/icons';

const Featured = ({ type, setGenre }) => {
    const [content, setContent] = useState({});
    const [showInfo, setShowInfo] = useState(false);

    const handleClick = () => {
        showInfo ? setShowInfo(false) : setShowInfo(true);
    };

    useEffect(() => {
        const getRandomContent = async () => {
            try {
                const res = await axios.get(`/movies/random?type=${type}`, {
                    headers: {
                        token:
                            'Bearer ' +
                            JSON.parse(localStorage.getItem('user')).accessToken
                    }
                });
                setContent(res.data[0]);
            } catch (err) {
                console.log(err);
            }
        };
        getRandomContent();
    }, [type]);

    return (
        <div className="featured">
            {type && (
                <div className="category">
                    <span>{type === 'movie' ? 'Movies' : 'Series'}</span>
                    <select
                        name="genre"
                        id="genre"
                        onChange={(e) => setGenre(e.target.value)}
                    >
                        <option value="">Genre</option>
                        <option value="adventure">Adventure</option>
                        <option value="comedy">Comedy</option>
                        <option value="crime">Crime</option>
                        <option value="fantasy">Fantasy</option>
                        <option value="historical">Historical</option>
                        <option value="horror">Horror</option>
                        <option value="romance">Romance</option>
                        <option value="sci-fi">Sci-fi</option>
                        <option value="western">Western</option>
                        <option value="animation">Animation</option>
                        <option value="drama">Drama</option>
                        <option value="documentary">Documentary</option>
                    </select>
                </div>
            )}
            <img
                src={content.img}
                // "https://help.nflxext.com/43e0db2f-fea0-4308-bfb9-09f2a88f6ee4_what_is_netflix_1_en.png"
                alt=""
            />

            <div className="info">
                <img
                    src={content.imgTitle}
                    // "https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUZdeG1DrMstq-YKHZ-dA-cx2uQN_YbCYx7RABDk0y7F8ZK6nzgCz4bp5qJVgMizPbVpIvXrd4xMBQAuNe0xmuW2WjoeGMDn1cFO.webp?r=df1"
                    alt=""
                />

                <span className="desc">{content.desc}</span>
                <div className="buttons">
                    <Link
                        to="/watch"
                        state={content}
                        style={{ textDecoration: 'none' }}
                    >
                        <button className="play">
                            <PlayArrow />
                            <span>Play</span>
                        </button>
                    </Link>
                    <button className="more" onClick={handleClick}>
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
            {showInfo ? (
                <div className="infoShow">
                    <span>{content.duration}</span>
                    <span className="limit">{content.limit}+</span>
                    <span>{content.year}</span>
                </div>
            ) : (
                ''
            )}
        </div>
    );
};

export default Featured;
