import React from "react";
import { Link } from "react-router-dom";

function Home(props) {
  return (
    <div>
      <div className="HomePage" style={{ size: "100%" }}>
        <div className="container">
          <div className="row">
            <div className="Heading col-md-8">
              <h3>The</h3>
              <h1>MakeUp</h1>
              <h2>Store</h2>
            </div>
            <div className="ButtonContainer col-md-4 col-sm-12">
              <p>Welcome to The MakeUP Store.</p>
              {props.homePageProps.Role === "unSigned" && (
              <Link
                class="btn btn-primary my-2"
                to="/Links/LoginScreen"
                role="button"
              >
                Go to Login
              </Link>)}
              <Link className="btn btn-primary" to="/Pages/Catalogue" role="button">
                Check Catalogue
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
