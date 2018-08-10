import React, { Component } from "react";
class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Snow White Laundry Room</h1>
                <p className="lead">
                  {" "}
                  Welcome to Snow White Laundry Room.
                  </p>
                  <p>
                  Register for a free
                  account to receive promotions and points when you use our
                  services.
                </p>
                <hr />
                <a href="register.html" className="btn btn-lg btn-info mr-2">
                  Register
                </a>
                <a href="login.html" className="btn btn-lg btn-light">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
