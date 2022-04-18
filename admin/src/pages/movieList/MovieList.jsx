import './movieList.css';
import { DataGrid } from '@material-ui/data-grid';
import { movieRows } from '../../dummyData';
import { deleteMovie, getMovies } from '../../context/movieContext/apiCalls';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../../context/movieContext/MovieContext';

const MovieList = () => {
    const { movies, dispatch } = useContext(MovieContext);

    useEffect(() => {
        getMovies(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteMovie(id, dispatch);
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        {
            field: 'movie',
            headerName: 'Movie',
            width: 130,
            renderCell: (params) => {
                return (
                    <div className="productListItem">
                        <img
                            src={params.row.img}
                            alt=""
                            className="productListImg"
                        />
                        {params.row.title}
                    </div>
                );
            }
        },
        { field: 'genre', headerName: 'Genre', width: 120 },
        { field: 'year', headerName: 'year', width: 120 },
        { field: 'limit', headerName: 'limit', width: 120 },
        { field: 'isSeries', headerName: 'isSeries', width: 120 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={'/movie/' + params.row._id} state={params.row}>
                            <button className="productListEdit">Edit</button>
                        </Link>
                        <DeleteOutline
                            className="productListDelete"
                            onClick={() => handleDelete(params.row._id)}
                        />
                    </>
                );
            }
        }
    ];

    return (
        <div className="productList">
            <DataGrid
                rows={movies}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
                getRowId={(r) => r._id}
            />
        </div>
    );
};

export default MovieList;
