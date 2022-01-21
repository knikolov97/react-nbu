import React from 'react';
import LaunchDetails from "./pages/LaunchDetails";
import {Link} from "react-router-dom";
import './Launches.css';

const Launches = ({launches, loading, launchpads}) => {
    if (loading) {
        return <h2>Loading...</h2>
    }

    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

    return (
        <table className="table table-hover">
            <thead>
            <tr>
                <th scope="col" className="green-text">Date</th>
                <th scope="col" className="green-text">Location</th>
                <th scope="col" className="open-launch-th green-text">More Info</th>
            </tr>
            </thead>
            <tbody>
                {launches.map(launch => (
                    <tr key={launch.id} scope="row">
                        <td>{(new Date(launch.date_utc)).toLocaleDateString('en-US', DATE_OPTIONS)}</td>
                        <td className="launchpad-region">{launchpads[launch.launchpad].region}</td>
                        <td>
                            <Link to={"/launch/" + launch.id} >
                                <div onClick={LaunchDetails} className="btn btn-primary open-launch">Open</div>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
};

export default Launches;
