import React from "react";
// Router
import { Link } from "react-router-dom";
// Bootstrap imports
import Button from "react-bootstrap/Button";
// static assets
import heroImg from "assets/img/20.png";

function Home() {
  return (
    <section className="section hero-unit">
      <div className="container h-100">
        <div className="row h-100 justify-content-center">
          <div className="col-sm-12">
            <div className="row">
              <div className="col-sm-6">
                <img src={heroImg} width="100%" alt="Hero-unit" />
              </div>
              <div className="col-sm-6 d-flex">
                <div className="text-center align-self-center w-100">
                  <h1>Welcome to Ivy Lender</h1>
                  <h3>Business lending in a league of its own</h3>
                  <div className="mb-4">
                    <Link to="/application">
                      <Button variant="primary" className="btn-rounded">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                  <div>
                    <p>
                      Didn't have an account?{" "}
                      <Link to="/register">Sign Up</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
