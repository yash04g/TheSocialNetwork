import React from 'react';

class Signup extends React.Component{
    constructor(){
        super();
        this.state = {
            name : "",
            email : "",
            password : "",
            error: ""
        }
    }
    render(){
        return (
          <div className="container">
            <h2 className="mt-5 mb-5">Signup</h2>
            <form>
              <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="text" className="form-control" />
              </div>
            </form>
            <form>
              <div className="form-group">
                <label className="text-muted">Email</label>
                <input type="email" className="form-control" />
              </div>
            </form>
            <form>
              <div className="form-group">
                <label className="text-muted">Name</label>
                <input type="password" className="form-control" />
              </div>
            </form>
            <button className="btn btn-raised btn-primary">Submit</button>
          </div>
        );
    }
}

export default Signup;