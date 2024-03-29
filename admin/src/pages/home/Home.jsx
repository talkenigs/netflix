import './home.css';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import Chart from '../../components/chart/Chart';
import { userData } from '../../dummyData';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

const Home = () => {

    const MONTHS = useMemo(
        () => [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Agu',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ],
        []
    );

    const [userStats, setUserStats] = useState([]);

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await axios.get('users/stats', {
                    headers: {
                        token:
                            'Bearer ' +
                            JSON.parse(localStorage.getItem('user')).accessToken
                    }
                });
                console.log(res.data);
                const statsList = res.data.sort(function (a, b) {
                    return a._id - b._id;
                });
                statsList.map((item) =>
                    setUserStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], 'New User': item.total }
                    ])
                );
            } catch (err) {
                console.log(err);
            }
        };
        getStats();
    }, [MONTHS]);

    return (
        <div className="home">
            <FeaturedInfo />
            <Chart
                data={userStats}
                title="User Analytics"
                grid
                datakey="New User"
                className="chartMovie"
            />
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    );
};

export default Home;
