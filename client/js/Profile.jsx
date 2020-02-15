import React, { useContext, Fragment } from 'react'
import Navbar from './Navbar'
import { GlobalContext } from './GlobalContext'
import LoginModal from './LoginModal';
import SessionWordList from './SessionWordList';
import PopularQueriesTable from "./PopularQueriesTable"
import "../css/Profile.css";

const Profile = (props) => {

    const { currentUser } = useContext(GlobalContext);

    return (
        <Fragment>
            <LoginModal />
            <Navbar />
            <div className="jumbotron">
                <div className="display-3 jumbotron__text">
                    <span>A</span>hoy{currentUser && ", " + currentUser.username}!
                </div>
            </div>
            <SessionWordList />
            {
                currentUser && <PopularQueriesTable history={props.history} userId={currentUser.id} />
            }
        </Fragment>
    )

}

export default Profile;