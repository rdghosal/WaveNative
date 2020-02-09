import React, { Fragment } from "react";


const MediaButtons = ({ wave, type }) => {
    return (
        <Fragment>
            <button className="button-drawer__button button--play" onClick={ wave.play() }>
                Play
            </button>
            <button className="button-drawer__button button--stop" onClick={ wave.stop() }>
                Stop
            </button>
        </Fragment>
    );
}

export default MediaButtons;