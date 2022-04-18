import './newMovie.css';
import { useContext, useState } from 'react';
import storage from '../../firebase';
import firebase from 'firebase/compat/app';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { createMovie } from '../../context/movieContext/apiCalls';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { Navigate, useNavigate } from 'react-router-dom';

const NewMovie = () => {
    const [movie, setMovie] = useState(null);
    const [img, setImg] = useState(null);
    const [imgTitle, setImgTitle] = useState(null);
    const [imgSm, setImgSm] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [video, setVideo] = useState(null);
    const [uploaded, setUploaded] = useState(0);

    const navigate = useNavigate();
    const { dispatch } = useContext(MovieContext);

    const handleChange = (e) => {
        const value = e.target.value;
        setMovie({ ...movie, [e.target.name]: value });
    };

    const upload = (items) => {
        items
            .filter((item) => item.file !== null)
            .forEach((item) => {
                const uploadRef = ref(storage, `images/${item.file.name}`);
                const uploadTask = uploadBytesResumable(uploadRef, item.file);
                // const uploadTask = storage.ref(`/items/${item.file.name}`).put(item);
                console.log('first');
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
                        setUploaded((prev) => prev + 1);
                    }
                );
            });
    };

    const handleUpload = (e) => {
        e.preventDefault();
        upload([
            { file: img, label: 'img' },
            { file: imgTitle, label: 'imgTitle' },
            { file: imgSm, label: 'imgSm' },
            { file: trailer, label: 'trailer' },
            { file: video, label: 'video' }
        ]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createMovie(movie, dispatch);
        navigate('/movies');
    };

    return (
        <div className="newProduct">
            <h1 className="addProductTitle">New Movie</h1>
            <form className="addProductForm">
                <div className="addProductItem">
                    <label>Image</label>
                    <input
                        type="file"
                        id="img"
                        name="img"
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>Title image</label>
                    <input
                        type="file"
                        id="imgTitle"
                        name="imgTitle"
                        onChange={(e) => setImgTitle(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>Thumbnail image</label>
                    <input
                        type="file"
                        id="imgSm"
                        name="imgSm"
                        onChange={(e) => setImgSm(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>Title</label>
                    <input
                        type="text"
                        placeholder="John Wick"
                        name="title"
                        onChange={handleChange}
                    />
                </div>
                <div className="addProductItem">
                    <label>Description</label>
                    <input
                        type="text"
                        placeholder="description"
                        name="desc"
                        onChange={handleChange}
                    />
                </div>
                <div className="addProductItem">
                    <label>Year</label>
                    <input
                        type="text"
                        placeholder="Year"
                        name="year"
                        onChange={handleChange}
                    />
                </div>
                <div className="addProductItem">
                    <label>Genre</label>
                    <input
                        type="text"
                        placeholder="Genre"
                        name="genre"
                        onChange={handleChange}
                    />
                </div>
                <div className="addProductItem">
                    <label>Duration</label>
                    <input
                        type="text"
                        placeholder="Duration"
                        name="duration"
                        onChange={handleChange}
                    />
                </div>
                <div className="addProductItem">
                    <label>Limit</label>
                    <input
                        type="text"
                        placeholder="limit"
                        name="limit"
                        onChange={handleChange}
                    />
                </div>
                <div className="addProductItem">
                    <label>Is Series?</label>
                    <select
                        name="isSeries"
                        id="isSeries"
                        onChange={handleChange}
                    >
                        <option value="false">No</option>
                        <option value="true">Yes</option>
                    </select>
                </div>
                <div className="addProductItem">
                    <label>Trailer</label>
                    <input
                        type="file"
                        name="trailer"
                        onChange={(e) => setTrailer(e.target.files[0])}
                    />
                </div>
                <div className="addProductItem">
                    <label>Video</label>
                    <input
                        type="file"
                        name="video"
                        onChange={(e) => setVideo(e.target.files[0])}
                    />
                </div>
                {uploaded >= 3 ? (
                    <button className="addProductButton" onClick={handleSubmit}>
                        Create
                    </button>
                ) : (
                    <button className="addProductButton" onClick={handleUpload}>
                        Upload
                    </button>
                )}
            </form>
        </div>
    );
};

export default NewMovie;
