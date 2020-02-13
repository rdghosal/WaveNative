import React, { useContext, Fragment } from 'react'
import Navbar from './Navbar'
import { GlobalContext } from './GlobalContext'
import LoginModal from './LoginModal';
import SessionWordList from './SessionWordList';
import PopularQueriesTable from "./PopularQueriesTable"

const Profile = () => {

    const { currentUser } = useContext(GlobalContext);

    return (
        <Fragment>
            <LoginModal />
            <Navbar />
            <div className="greeting jumbotron">
                <div className="display-3">
                    Ahoy{currentUser && ", " + currentUser.type} { currentUser && currentUser.id}!
                </div>
            </div>
            <h2>Your last searches</h2>
            <SessionWordList />
            <hr></hr>
            <h2>Your popular searches</h2>
            {
                currentUser && <PopularQueriesTable userId={currentUser.id} />
            }
        </Fragment>
    )

}

export default Profile;