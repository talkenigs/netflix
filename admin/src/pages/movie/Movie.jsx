import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import './movie.css';
import { Publish } from '@material-ui/icons';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { updateMovie } from '../../context/movieContext/apiCalls';
import { useContext, useState } from 'react';
import storage from '../../firebase';
import firebase from 'firebase/compat/app';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

const Movie = () => {
    const location = useLocation();
    // const movie = location.state;
    const navigate = useNavigate();

    const [movie, setMovie] = useState(location.state);
    const { dispatch } = useContext(MovieContext);

    const [img, setImg] = useState(null);
    const [imgTitle, setImgTitle] = useState(null);
    const [imgSm, setImgSm] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [video, setVideo] = useState(null);
    const [uploaded, setUploaded] = useState(false);

    const handleChange = (e) => {
        const value = e.target.value;
        setMovie({ ...movie, [e.target.name]: value });
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        upload([
            { file: img, label: 'img' },
            { file: imgTitle, label: 'imgTitle' },
            { file: imgSm, label: 'imgSm' },
            { file: trailer, label: 'trailer' },
            { file: video, label: 'video' }
        ]);
    };

    const upload = (items) => {
        items
            .filter((item) => item.file !== null)
            .forEach((item) => {
                setUploaded(false);
                const uploadRef = ref(storage, `images/${item.file.name}`);
                const uploadTask = uploadBytesResumable(uploadRef, item.file);
                // const uploadTask = storage.ref(`/items/${item.file.name}`).put(item);
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const progress =
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100;
                        console.log('Upload is ' + progress + '% done');

                        if (snapshot.state === 'RUNNING') {
                            console.log(`Progress ${progress}%`);
                        }
                    },
                    (err) => {
                        console.log(err);
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(
                            uploadTask.snapshot.ref
                        );
                        setMovie((prev) => {
                            return { ...prev, [item.label]: downloadURL };
                        });
                    }
                );
                setUploaded(true);
            });
        setUploaded(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateMovie(movie, dispatch);
        navigate('/movies');
    };

    return (
        <div className="product">
            <div className="productTitleContainer">
                <h1 className="productTitle">Movie</h1>
                <Link to="/newMovie">
                    <button className="productAddButton">Create</button>
                </Link>
            </div>
            <div className="productTop">
                <div className="productTopRight">
                    <div className="productInfoTop">
                        <img
                            src={movie.img}
                            alt=""
                            className="productInfoImg"
                        />
                        <span className="productName">{movie.title}</span>
                    </div>
                    <div className="productInfoBottom">
                        <div className="productInfoItem">
                            <span className="productInfoKey">id:</span>
                            <span className="productInfoValue">
                                {movie._id}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">genre:</span>
                            <span className="productInfoValue">
                                {movie.genre}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">year:</span>
                            <span className="productInfoValue">
                                {movie.year}
                            </span>
                        </div>
                        <div className="productInfoItem">
                            <span className="productInfoKey">limit:</span>
                            <span className="productInfoValue">
                                {movie.limit}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="productBottom">
                <form className="productForm">
                    <div className="productFormLeft">
                        <label>Movie Title</label>
                        <input
                            type="text"
                            name="title"
                            placeholder={movie.title}
                            onChange={handleChange}
                        />
                        <label>Description</label>
                        <input
                            type="text"
                            name="desc"
                            placeholder={movie.desc}
                            onChange={handleChange}
                        />
                        <label>Year</label>
                        <input
                            type="text"
                            name="year"
                            placeholder={movie.year}
                            onChange={handleChange}
                        />
                        <label>Genre</label>
                        <input
                            type="text"
                            name="genre"
                            placeholder={movie.genre}
                            onChange={handleChange}
                        />
                        <label>Limit</label>
                        <input
                            type="text"
                            name="limit"
                            placeholder={movie.limit}
                            onChange={handleChange}
                        />
                        <label>Duration</label>
                        <input
                            type="text"
                            name="duration"
                            placeholder={movie.duration}
                            onChange={handleChange}
                        />
                        <label>Trailer</label>
                        <input
                            type="file"
                            name="trailer"
                            placeholder={movie.trailer}
                            onChange={(e) => setTrailer(e.target.files[0])}
                        />
                        <label>Video</label>
                        <input
                            type="file"
                            name="video"
                            placeholder={movie.video}
                            onChange={(e) => setVideo(e.target.files[0])}
                        />
                    </div>
                    <div className="productFormRight">
                        <div className="productUpload">
                            <img
                                src={movie.img}
                                alt=""
                                className="productUploadImg"
                            />
                            <label for="img">
                                <Publish />
                                Main img
                            </label>
                            <input
                                type="file"
                                id="img"
                                name="img"
                                onChange={(e) => setImg(e.target.files[0])}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className="productUpload">
                            <img
                                src={movie.imgTitle}
                                alt=""
                                className="productUploadImg"
                            />
                            <label for="imgTitle">
                                <Publish /> Title
                            </label>
                            <input
                                type="file"
                                id="imgTitle"
                                name="imgTitle"
                                onChange={(e) => setImgTitle(e.target.files[0])}
                                style={{ display: 'none' }}
                            />
                        </div>
                        <div className="productUpload">
                            <img
                                src={movie.imgSm}
                                alt=""
                                className="productUploadImg"
                            />
                            <label for="imgSm">
                                <Publish /> Tumb
                            </label>
                            <input
                                type="file"
                                id="imgSm"
                                name="imgSm"
                                onChange={(e) => setImgSm(e.target.files[0])}
                                style={{ display: 'none' }}
                            />
                        </div>
                        {!uploaded ? (
                            <button
                                className="productButton"
                                onClick={handleUpdate}
                            >
                                Upload
                            </button>
                        ) : (
                            <button
                                className="productButton"
                                onClick={handleSubmit}
                            >
                                Update
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Movie;
