import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import AppRouter from "./AppRouter";
import "../css/Landing.css";
// import "../css/App.css";


const Landing = () => {
    useEffect(() => {
        document.querySelector("#content").classList.add("content--landing");
    });

    return (
        <Fragment>
            <div className="landing">
                <div className="landing__logo"><span>W</span>ave <span>N</span>ative</div>
                <div className="how-to">
                    <div className="how-to__section section--why">
                        <div className="section__title">Why</div>
                        <div className="section__text"> 
            Lorem dolor suscipit ipsum optio quia Aliquam dolore placeat impedit voluptatibus neque fugiat similique asperiores est Voluptatum itaque similique placeat in quia commodi Magnam architecto optio atque quia deleniti velit? Perspiciatis quasi incidunt excepturi aliquam veniam consequuntur Temporibus expedita non ipsam porro quae! Suscipit nesciunt a quasi quis a eos!
                        </div>
                        <button className="landing__button button--go-to-app"><Link to="/app/" className="react-link">Set sail</Link></button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default Landing;
