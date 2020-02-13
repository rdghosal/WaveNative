import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const PopularQueriesTable = ({ userId }) => {

    const [ popularQueries, setPopularQueries ] = useState(null);

    useEffect(() => {
        if (!popularQueries) {
            fetch(`/api/queries/${userId}`)
                .then(response => {
                    console.log(response)
                    return response.json()
                })
                .then(data => {
                    let queries = new Object();
                    for (let key of Object.keys(data)) {
                        queries[key] = data[key];
                    }
                    console.log(queries)
                    setPopularQueries(queries);
                });
        }
    }, []);

    return (
        <div className="popular-queries-table container">
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>
                            Word
                        </th>
                        <th>
                            Number of times searched
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        popularQueries 
                            && Object.keys(popularQueries).map((key, i) => <tr key={i}><td><Link to={`/search?word=${key}`}>{key}</Link></td><td>{ popularQueries[key] }</td></tr>)
                    }
                </tbody>
            </table>
            
        </div>
    )
}

export default PopularQueriesTable
