import React, { Component } from "react";
import { connect } from "react-redux";
import { isLoggedIn } from "../Actions/UserActions";
import AdminNavigationbar from "../AdminComponents/AdminNavigationbar";
import { Login } from "../Pages";

const mapStatetoProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchtoProps = dispatch => ({
  isLoggedIn: () => {
    dispatch(isLoggedIn());
  }
});

class Admin extends Component {
  componentDidMount() {
    this.props.isLoggedIn();
  }
  render() {
    return (
      <div>
        {this.props.user.isLoggedIn === true ? (
          <div>
            <AdminNavigationbar />
            <br />
            <br />
            <p>this is admin page</p>
          </div>
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Admin);
