import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Launches from "../Launches";
import Pagination from "../Pagination";
import './Home.css';

function Home() {
    let passedPage = window.location.href.slice(window.location.href.lastIndexOf('/') + 1, window.location.href.length);
    if (passedPage !== '') {
        passedPage = parseInt(passedPage, 10);
    }

    const [launches, setLaunches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(passedPage ? passedPage : 1);
    const [launchesPerPage] = useState(10);
    const [launchpads, setLaunchpads] = useState([{id: '', launchpad: {}}]);

    useEffect(() => {
        const fetchLaunches = async () => {
            setLoading(true);

            const res = await axios.get('https://api.spacexdata.com/v4/launches');
            setLaunches(res.data.reverse());

            const res2 = await axios.get('https://api.spacexdata.com/v4/launchpads');
            let a = [];
            for (let i = 0; i < res2.data.length; i++) {
                a[res2.data[i].id] = res2.data[i];
            }
            setLaunchpads(a);

            setLoading(false);
        };

        fetchLaunches();
    }, []);

    const indexOfLastLaunch = currentPage * launchesPerPage;
    const indexOfFirstLaunch = indexOfLastLaunch - launchesPerPage;
    const currentLaunch = launches.slice(indexOfFirstLaunch, indexOfLastLaunch);

    const paginate = (pageNumber) => {
        localStorage.setItem("page", pageNumber);
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container">
            <h2 id="launches-header"><b>Launches</b></h2>
            <Launches launches={currentLaunch} launchpads={launchpads} loading={loading} />
            <Pagination launchesPerPage={launchesPerPage} totalLaunches={launches.length} paginate={paginate} currentPage={currentPage} />
        </div>
    );
}

export default Home;
