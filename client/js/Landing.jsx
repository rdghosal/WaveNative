import React, {Fragment} from 'react';
import "./Landing.css"
import { Link, withRouter } from 'react-router-dom';

const Landing = (props) => {
    return (
        <Fragment>
            <div className="landing container-fluid">
                <div className="row">
                    <div className="landing__banner">
                        <span>W</span>ave <span>N</span>ative
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="landing__contents">
                            <div className="landing__desc">
                                <h2>All aboard</h2>
                                <p>
                                    How do your pronounce something you can't see?<br/>
                                    WaveNative solves this by visualizing your pronunciation of English against that of a native.<br/>
                                    Pinpoint, improve, and be amazed.
                                </p>
                            </div>
                            <button className="landing__button btn btn-primary" onClick={() => props.history.push("/search")}>Set Sail</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Landing;
