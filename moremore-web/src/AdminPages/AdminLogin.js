import React, { Component } from "react";
import { signInWithEmail, isLoggedIn } from "../Actions/AdminAction";
import { connect } from "react-redux";
import LoginForm from "../Components/LoginForm";

const mapStatetoProps = state => {
  return {
    admin: state.admin
  };
};

const mapDispatchtoProps = dispatch => ({
  signInWithEmail: (user, pass) => {
    dispatch(signInWithEmail(user, pass));
  },
  isLoggedIn: () => {
    dispatch(isLoggedIn());
  }
});

class AdminLogin extends Component {
  componentDidMount() {
    this.props.isLoggedIn();
  }
  submit = values => {
    this.props.signInWithEmail(values.email, values.password);
  };
  render() {
    if (this.props.admin.isLoggedIn === true) {
      this.props.history.push("/Admin");
    }
    return (
      <div>
        <LoginForm onSubmit={this.submit} />
        <p>{this.props.admin.message}</p>
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(AdminLogin);

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { isAdminLoggedIn } from "../Actions/AdminAction";
// import AdminNavigationbar from "../AdminComponents/AdminNavigationbar";
// import { Login } from "../Pages";
// import { Col, Row, Tabs, Tab } from "react-bootstrap";
// import AddProductForm from "../AdminComponents/AddProductForm";

// const mapStatetoProps = state => {
//   return {
//     admin: state.admin
//   };
// };

// const mapDispatchtoProps = dispatch => ({
//   isAdminLoggedIn: () => {
//     dispatch(isAdminLoggedIn());
//   }
// });

// class Admin extends Component {
//   componentDidMount() {
//     this.props.isAdminLoggedIn();
//   }
//   render() {
//     return (
//       <div>
//         {this.props.admin.isAdmin === true ? (
//           <div>
//             <AdminNavigationbar />
//             <br />
//             <br />
//             <Tabs
//               defaultActiveKey={1}
//               animation={false}
//               id="noanim-tab-example"
//             >
//               <Tab eventKey={1} title="เพิ่มชีท">
//                 <Row>
//                   <Col sm={2} />
//                   <Col>
//                   <AddProductForm onSubmit={this.submit} />
//                   </Col>
//                 </Row>
//               </Tab>
//               <Tab eventKey={2} title="ดูชีท">
//                 <Row>
//                   <Col sm={2} />
//                   <Col>
//                     <p align="left">watch</p>
//                   </Col>
//                 </Row>
//               </Tab>
//               <Tab eventKey={3} title="ประวัติการสั่งซื้อ">
//                 <Row>
//                   <Col sm={2} />
//                   <Col>
//                     <p align="left">history</p>
//                   </Col>
//                 </Row>
//               </Tab>
//             </Tabs>
//           </div>
//         ) : (
//           <Login />
//         )}
//       </div>
//     );
//   }
// }

// export default connect(
//   mapStatetoProps,
//   mapDispatchtoProps
// )(Admin);
