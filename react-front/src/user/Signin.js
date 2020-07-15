import React from "react";
import { Redirect } from "react-router-dom";

class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false,
    };
  }

  handleChange = (name) => (event) => {
    this.setState({ error: "" });
    this.setState({ [name]: event.target.value });
  };
  authenticate(jwt, next) {
    if (typeof window !== "undefined") {
      localStorage.setItem("jwt", JSON.stringify(jwt));
    }
    next(); // Execute the callback
  }
  clickSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const { username, password } = this.state;
    const user = {
      username,
      password,
    };
    //   console.log(user);
    // Sending data to backend using fetch
    this.signin(user).then((data) => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        /*We need to authenticate the user and we need to redirect the user */
        this.authenticate(data, () => {
          this.setState({ redirectToReferer: true, loading: false });
        });
      }
    });
  };
  signin = (user) => {
    return fetch("http://localhost:8080/signin", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  };
  signinForm = (username, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Username</label>
        <input
          onChange={this.handleChange("username")}
          type="text"
          className="form-control"
          value={username}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          onChange={this.handleChange("password")}
          type="password"
          className="form-control"
          value={password}
        />
        <button
          onClick={this.clickSubmit}
          className="btn btn-raised btn-primary"
        >
          Submit
        </button>
      </div>
    </form>
  );

  render() {
    const {
      username,
      password,
      error,
      redirectToReferer,
      loading,
    } = this.state;

    if (redirectToReferer) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Signin</h2>
        <div
          className="alert alert-danger"
          style={{ display: error ? "" : "none" }}
        >
          {error}
        </div>
        {loading ? (
          <div className="jumbotron text-center">
            <h2>Loading</h2>
          </div>
        ) : (
          ""
        )}
        {this.signinForm(username, password)}
      </div>
    );
  }
}

export default Signin;
