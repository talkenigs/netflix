import './listList.css';
import { DataGrid } from '@material-ui/data-grid';
import { deleteMovie, getLists } from '../../context/listContext/apiCalls';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { ListContext } from '../../context/listContext/ListContext';
import { deleteList } from '../../context/listContext/apiCalls';

const ListList = () => {
    const { lists, dispatch } = useContext(ListContext);

    useEffect(() => {
        getLists(dispatch);
    }, [dispatch]);

    const handleDelete = (id) => {
        deleteList(id, dispatch);
    };

    const columns = [
        { field: '_id', headerName: 'ID', width: 90 },
        { field: 'title', headerName: 'Title', width: 190 },
        { field: 'genre', headerName: 'Genre', width: 120 },
        { field: 'type', headerName: 'Type', width: 120 },
        { field: 'isSeries', headerName: 'isSeries', width: 120 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={'/list/' + params.row._id} state={params.row}>
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
                rows={lists}
                disableSelectionOnClick
                columns={columns}
                pageSize={8}
                checkboxSelection
                getRowId={(r) => r._id}
            />
        </div>
    );
};

export default ListList;
