import { useEffect, useState } from 'react';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import Navbar from '../../components/navbar/Navbar';
import './home.scss';
import axios from 'axios';
import { ListSharp } from '@material-ui/icons';

const Home = ({ type }) => {
    const [lists, setLists] = useState([]);
    const [genre, setGenre] = useState(null);

    useEffect(() => {
        const getRandomLists = async () => {
            try {
                const res = await axios.get(
                    `lists${type ? '?type=' + type : ''}${
                        genre ? '&genre=' + genre : ''
                    }`,
                    {
                        headers: {
                            token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTk4OGU0ODQ1NjFjMDQ0ZTg5NmRkYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MDA0MzI1NiwiZXhwIjoxNjUwNDc1MjU2fQ.dWKv_ASlD0aEd615aQfJ6PZHU50ZrMP7NgNTaldXKkA'
                        }
                    }
                );
                setLists(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getRandomLists();
    }, [type, genre]);

    return (
        <div className="home">
            <Navbar />
            <Featured type={type} setGenre={setGenre} />
            {lists.map((list) => (
                <List list={list} />
            ))}
        </div>
    );
};

export default Home;
