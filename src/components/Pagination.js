import React from 'react';
import './Pagination.css';

const Pagination = ({launchesPerPage, totalLaunches, paginate, currentPage}) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalLaunches/launchesPerPage); i++) {
        pageNumbers.push(i);
    }

    console.log(currentPage);

    return (
        <nav>
            <ul className="pagination" id="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className={number === currentPage ? "page-item disabled" : "page-item"}>
                        <a onClick={() => paginate(number)} className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
};

export default Pagination;
