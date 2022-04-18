import { Visibility } from '@material-ui/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './widgetSm.css';

const WidgetSm = () => {
    const [newUsers, setNewUsers] = useState([]);

    useEffect(() => {
        const getNewUsers = async () => {
            try {
                const res = await axios.get('/users?new=true', {
                    headers: {
                        token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTk4OGU0ODQ1NjFjMDQ0ZTg5NmRkYiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MDA0MzI1NiwiZXhwIjoxNjUwNDc1MjU2fQ.dWKv_ASlD0aEd615aQfJ6PZHU50ZrMP7NgNTaldXKkA'
                    }
                });
                setNewUsers(res.data);
            } catch (err) {
                console.log(err);
            }
        };
        getNewUsers();
    }, []);

    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {newUsers.map((user) => (
                    <li className="widgetSmListItem">
                        <img
                            src={
                                user.profilePic ||
                                'https://pbs.twimg.com/media/D8tCa48VsAA4lxn.jpg'
                            }
                            alt=""
                            className="widgetSmImg"
                        />
                        <div className="widgetSmUser">
                            <span className="widgetSmUsername">
                                {user.username}
                            </span>
                            <span className="widgetSmUserTitle">
                                Software Engineer
                            </span>
                        </div>
                        <button className="widgetSmButton">
                            <Visibility className="widgetSmIcon" />
                            Display
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WidgetSm;
