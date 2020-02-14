import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';

const PopularQueriesTable = ({ userId, history }) => {

    const [ popularQueries, setPopularQueries ] = useState(null);

    useEffect(() => {
        if (!popularQueries) {
            fetch(`/api/queries/${userId}`)
                .then(response => {
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
        <div className="container-fluid">
            <div className="popular-queries__header row justify-content-left">
                <h2>Your popular searches</h2>
            </div>
            {
                popularQueries
                    ?   <>
                            <p className="instructions">Click a row to search the wave again!</p>
                            <table className="popular-queries__table table table-borderless">
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
                                            && Object.keys(popularQueries).map((key, i) =><tr key={i} onClick={() => history.push(`/search?word=${key}`)}><td>{key}</td><td>{ popularQueries[key] }</td></tr>)
                                    }
                                </tbody>
                            </table>
                        </>
                    :   <p className="fallback-text">Let's go <Link to="/search">search</Link> some waves!</p>

                }
        </div>
        )
    }

    export default withRouter(PopularQueriesTable);
