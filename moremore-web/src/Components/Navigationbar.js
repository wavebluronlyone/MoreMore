import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut, isLoggedIn } from "../Actions/UserActions";
import { adminSignOut } from "../Actions/AdminActions";
import {
  Menu,
  Image,
  Container,
  Label,
  Responsive,
  Sidebar
} from "semantic-ui-react";
import image from "../Image/shop.png";
import logo from "../Image/logobold.png";
import "../Styles/App.css";

const mapStatetoProps = state => {
  return {
    user: state.user,
    admin: state.admin,
    stock: state.stock
  };
};

const mapDispatchtoProps = dispatch => ({
  signOut: () => {
    dispatch(signOut());
  },
  adminSignOut: () => {
    dispatch(adminSignOut());
  },
  isLoggedIn: () => {
    dispatch(isLoggedIn());
  }
});

class Navigationbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "",
      sidebarOpened: false
    };
  }

  handleSidebarHide = () => this.setState({ sidebarOpened: false });

  handleToggle = () => this.setState({ sidebarOpened: true });

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  componentDidMount() {
    this.props.isLoggedIn();
  }
  componentDidUpdate(prevProps) {
    if (this.props.user.isLoggedIn !== prevProps.user.isLoggedIn) {
      this.props.isLoggedIn();
    }
  }

  render() {
    const { activeItem } = this.state;
    const { sidebarOpened } = this.state;
    return (
      <div>
        <Responsive maxWidth={800}>
          {this.props.admin.isLoggedIn === true ? (
            <Menu fixed="top" style={{ backgroundColor: "#fbb900" }}>
              <Container>
                <Menu style={{ borderColor: "#fbb900" }} pointing secondary>
                  <Menu.Menu>
                    <Image
                      style={{
                        width: "5em",
                        height: "5em"
                      }}
                      src={logo}
                    />
                  </Menu.Menu>
                  <Menu.Item name="     " />
                  <Menu.Item
                    as="a"
                    name="Logout"
                    color="#43464b"
                    style={{
                      bottom: "20%",
                      fontFamily: "Prompt"
                    }}
                    active={activeItem === "Log out"}
                    onClick={() => {
                      this.props.adminSignOut();
                    }}
                  />
                </Menu>
              </Container>
            </Menu>
          ) : (
            <div>
              <Sidebar
                style={{ backgroundColor: "#ffc700", fontFamily: "Prompt" }}
                as={Menu}
                animation="push"
                onHide={this.handleSidebarHide}
                vertical
                visible={sidebarOpened}
              >
                <Menu.Item
                  onClick={this.handleSidebarHide}
                  as={Link}
                  to="/About"
                >
                  About us
                </Menu.Item>
                <Menu.Item
                  onClick={this.handleSidebarHide}
                  as={Link}
                  to="/Sheeter"
                >
                  สมัครนักทำชีทสรุป
                </Menu.Item>
              </Sidebar>

              <Sidebar.Pusher dimmed={sidebarOpened}>
                <Menu
                  fixed="top"
                  style={{ backgroundColor: "#ffc700", overflow: "auto" }}
                >
                  <Menu
                    style={{
                      borderColor: "#ffc700",
                      backgroundColor: "#ffc700",
                      minWidth: "100%"
                    }}
                    pointing
                    secondary
                  >
                    <Menu.Item
                      style={{
                        bottom: "20%",
                        fontFamily: "Prompt"
                      }}
                      icon="sidebar"
                      onClick={this.handleToggle}
                    />
                    <Menu.Item
                      style={{
                        bottom: "20%",
                        fontFamily: "Prompt"
                      }}
                      as={Link}
                      to="/"
                      name="Home"
                      active={activeItem === "Home"}
                      onClick={this.handleItemClick}
                    />
                    <Menu.Item
                      style={{
                        bottom: "20%",
                        fontFamily: "Prompt"
                      }}
                      as={Link}
                      to="/Shop"
                      name="Shop"
                      active={activeItem === "Shop"}
                      onClick={this.handleItemClick}
                    />
                    <Menu.Item>
                      <Image
                        as={Link}
                        to="/Cart"
                        style={{
                          width: "3em",
                          height: "3em",
                          bottom: "6%"
                        }}
                        src={image}
                      />
                      {this.props.stock.addCart.length > 0 ? (
                        <div style={{ left: "20%" }}>
                          <Label
                            size="tiny"
                            circular
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              fontFamily: "Prompt"
                            }}
                          >
                            {this.props.stock.addCart.length}
                          </Label>
                        </div>
                      ) : null}
                    </Menu.Item>
                    {Boolean(localStorage.getItem("isloggedIn")) === true ? (
                      <Menu.Menu>
                        <Menu.Item
                          style={{
                            bottom: "20%",
                            fontFamily: "Prompt"
                          }}
                          as={Link}
                          to="/Profile"
                          name="Profile"
                          active={activeItem === "Profile"}
                          onClick={this.handleItemClick}
                        />
                        <Menu.Item
                          style={{
                            bottom: "20%",
                            fontFamily: "Prompt"
                          }}
                          as="a"
                          name="Logout"
                          color="black"
                          active={activeItem === "Log out"}
                          onClick={() => {
                            this.props.signOut();
                          }}
                        />
                      </Menu.Menu>
                    ) : (
                      <Menu.Menu>
                        <Menu.Item
                          style={{
                            bottom: "20%",
                            fontFamily: "Prompt"
                          }}
                          as={Link}
                          to="/Login"
                          name="Login"
                          active={activeItem === "Login"}
                          onClick={this.handleItemClick}
                        />
                        <Menu.Item
                          style={{
                            bottom: "20%",
                            fontFamily: "Prompt"
                          }}
                          as={Link}
                          to="/Register"
                          name="Register"
                          active={activeItem === "Register"}
                          onClick={this.handleItemClick}
                        />
                      </Menu.Menu>
                    )}
                  </Menu>
                </Menu>
              </Sidebar.Pusher>
            </div>
          )}
        </Responsive>

        <Responsive minWidth={801}>
          {this.props.admin.isLoggedIn === true ? (
            <Menu fixed="top" style={{ backgroundColor: "#fbb900" }}>
              <Container>
                <Menu style={{ borderColor: "#fbb900" }} pointing secondary>
                  <Menu.Menu>
                    <Image
                      style={{
                        width: "5em",
                        height: "5em"
                      }}
                      src={logo}
                    />
                  </Menu.Menu>
                  <Menu.Item name="     " />
                  <Menu.Item
                    as="a"
                    name="Logout"
                    color="black"
                    style={{
                      bottom: "20%",
                      fontFamily: "Prompt"
                    }}
                    active={activeItem === "Log out"}
                    onClick={() => {
                      this.props.adminSignOut();
                    }}
                  />
                </Menu>
              </Container>
            </Menu>
          ) : (
            <Menu
              fixed="top"
              style={{ backgroundColor: "#ffc700", overflow: "auto" }}
            >
              <Container>
                <Menu
                  style={{
                    borderColor: "#ffc700",
                    backgroundColor: "#ffc700",
                    minWidth: "100%"
                  }}
                  pointing
                  secondary
                >
                  <Menu.Menu>
                    <Image
                      style={{
                        width: "5em",
                        height: "5em"
                      }}
                      src={logo}
                    />
                  </Menu.Menu>
                  <Menu.Item
                    style={{
                      bottom: "20%",
                      fontFamily: "Prompt"
                    }}
                    as={Link}
                    to="/"
                    name="Home"
                    active={activeItem === "Home"}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    style={{
                      bottom: "20%",
                      fontFamily: "Prompt"
                    }}
                    as={Link}
                    to="/Shop"
                    name="Shop"
                    active={activeItem === "Shop"}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    style={{
                      bottom: "20%",
                      fontFamily: "Prompt"
                    }}
                    as={Link}
                    to="/About"
                    name="About us"
                    active={activeItem === "About us"}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    style={{
                      bottom: "20%",
                      fontFamily: "Prompt"
                    }}
                    as={Link}
                    to="/Sheeter"
                    name="สมัครนักทำชีทสรุป"
                    active={activeItem === "สมัครนักทำชีทสรุป"}
                    onClick={this.handleItemClick}
                  />
                  {Boolean(localStorage.getItem("isloggedIn")) === true ? (
                    <Menu.Menu position="right">
                      <Menu.Menu>
                        <br />
                        <Image
                          as={Link}
                          to="/Cart"
                          style={{
                            width: "3em",
                            height: "3em",
                            bottom: "6%"
                          }}
                          src={image}
                        />
                        {this.props.stock.addCart.length > 0 ? (
                          <Label
                            size="tiny"
                            circular
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              fontFamily: "Prompt"
                            }}
                          >
                            {this.props.stock.addCart.length}
                          </Label>
                        ) : null}
                      </Menu.Menu>
                      <Menu.Item name=" " />
                      <Menu.Item
                        style={{
                          bottom: "20%",
                          fontFamily: "Prompt"
                        }}
                        as={Link}
                        to="/Profile"
                        name="Profile"
                        color="black"
                        active={activeItem === "Profile"}
                        onClick={this.handleItemClick}
                      />
                      <Menu.Item
                        style={{
                          bottom: "20%",
                          fontFamily: "Prompt"
                        }}
                        as="a"
                        name="Logout"
                        color="black"
                        active={activeItem === "Log out"}
                        onClick={() => {
                          this.props.signOut();
                        }}
                      />
                    </Menu.Menu>
                  ) : (
                    <Menu.Menu position="right">
                      <Menu.Menu>
                        <br />
                        <Image
                          as={Link}
                          to="/Cart"
                          style={{
                            width: "3em",
                            height: "3em",
                            bottom: "6%"
                          }}
                          src={image}
                        />
                        {this.props.stock.addCart.length > 0 ? (
                          <Label
                            size="tiny"
                            circular
                            style={{
                              backgroundColor: "red",
                              color: "white",
                              bottom: "20%",
                              fontFamily: "Prompt"
                            }}
                          >
                            {this.props.stock.addCart.length}
                          </Label>
                        ) : null}
                      </Menu.Menu>
                      <Menu.Item name=" " />
                      <Menu.Item
                        style={{
                          bottom: "20%",
                          fontFamily: "Prompt"
                        }}
                        as={Link}
                        to="/Login"
                        name="Login"
                        color="#43464b"
                        active={activeItem === "Login"}
                        onClick={this.handleItemClick}
                      />
                      <Menu.Item
                        style={{
                          bottom: "20%",
                          fontFamily: "Prompt"
                        }}
                        as={Link}
                        to="/Register"
                        name="Register"
                        color="#43464b"
                        active={activeItem === "Register"}
                        onClick={this.handleItemClick}
                      />
                    </Menu.Menu>
                  )}
                </Menu>
              </Container>
            </Menu>
          )}
        </Responsive>
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Navigationbar);
