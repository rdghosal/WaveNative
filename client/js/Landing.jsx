import React, {Fragment} from 'react';
import "./Landing.css"

const Landing = () => {
    return (
        <Fragment>
            <div className="landing">
                <div className="landing__banner">
                    <span>W</span>ave <span>N</span>ative
                </div>
                <div className="landing__contents">
                    <div className="landing__desc">
                        <h2>All aboard</h2>
                        <p>
                            How do your pronounce something you can't see?<br/>
                            WaveNative solves this by visualizing your pronunciation of English against that of a native.<br/>
                            Pinpoint, improve, and be amazed.
                        </p>
                    </div>
                    <button className="landing__button btn btn-primary" onClick={() => window.location.href = "/search"}>Set Sail</button>
                </div>
            </div>
        </Fragment>
    );
}

export default Landing;
