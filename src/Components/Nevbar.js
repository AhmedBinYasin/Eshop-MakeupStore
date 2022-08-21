import React from "react";
import {Link} from "react-router-dom";

const nevbarUser = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark my-nav"
            style={
                {padding: "0px"}
        }>
            <div className="container-fluid"
                style={
                    {padding: "0px"}
            }>
                <a className="navbar-brand mx-3" href="#">
                    {
                    props.title
                } </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 col-md-9">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">
                                Home
                            </Link>
                        </li>
                        {
                        (props.nevBarProps.Role === "unSigned" || props.nevBarProps.Role === "user") && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="/Pages/Catalogue">
                                        Catalogue
                                    </Link>
                                </li>
                                <li className="nav-item active">
                                    <Link className="nav-link" to="/Pages/Cart">
                                        Cart
                                    </Link>
                                </li>
                            </>
                        )
                    } </ul>
                    {
                    props.nevBarProps.Role === "unSigned" && (
                        <div className="col-md-3">
                            <a className="nav-user-item" href="/Links/LoginScreen"
                                style={
                                    {color: "black"}
                            }>
                                Login/Register
                            </a>
                        </div>
                    )
                }
                    {
                    props.nevBarProps.Role === "user" && (
                        <div className="col-md-3">
                            <h5 className="nav-user-item">
                                Current User : {
                                props.nevBarProps.Name
                            } </h5>
                        </div>
                    )
                }
                    {
                    props.nevBarProps.Role === "admin" && (
                        <div className="col-md-3">
                            <h5 className="nav-user-item">
                                Current User : {
                                props.nevBarProps.Name
                            }
                                {" (admin)"} </h5>
                        </div>
                    )
                } </div>
            </div>
        </nav>
    );
};

function Nevbar(props) {
    return nevbarUser(props);
}

export default Nevbar;
