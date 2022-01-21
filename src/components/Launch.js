import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Launch.css';
import spacexLogo from '../images/spacex-logo.png';


const Launch = ({launchId}) => {
    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const [launch, setLaunch] = useState({});
    const [launchUrl, setLaunchUrl] = useState(spacexLogo);
    const [status, setStatus] = useState('');
    const [statusStyle, setStatusStyle] = useState('');

    const currentTimestamp = Math.floor(Date.now() / 1000);

    useEffect(() => {
        const fetchLaunches = async () => {
            const res = await axios.get('https://api.spacexdata.com/v4/launches/' + launchId);
            setLaunch(res.data);
            if (res.data.links != null && res.data.links.patch.small != null) {
                setLaunchUrl(res.data.links.patch.small);
            }

            if (res.data.upcoming && res.data.date_unix < currentTimestamp) {
                setStatus('No info');
                setStatusStyle('text-info');
            } else if (res.data.upcoming) {
                setStatus('Upcoming');
                setStatusStyle('text-info');
            } else if (res.data.success) {
                setStatus('Success');
                setStatusStyle('text-success');
            } else {
                setStatus('Failure');
                setStatusStyle('text-danger');
            }
        };

        fetchLaunches();
    }, []);

    return (
        <div className="container">

            <div className="card border-light mb-3" >
                <div className="card-header" id="launch-name">{launch.name}</div>
                <div className="card-body">

                    <div className="row mt-3 mb-3">
                        <div className="col-md-6" id="textbox-details">
                            <div className="table-responsive-xl">
                                <table className="table table-borderless">
                                    <tbody>
                                    <tr>
                                        <th scope="row">Date</th>
                                        <td>{(new Date(launch.date_utc)).toLocaleDateString('en-US', DATE_OPTIONS)}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Flight Number</th>
                                        <td>{launch.flight_number}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Status</th>
                                        <td className={statusStyle}>{status}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Details</th>
                                        <td>{launch.details ? launch.details : "No details"}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="col-md-6" id="image">
                            <img className="img-fluid" src={launchUrl} alt="launch-img" />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Launch;
