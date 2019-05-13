import React, { Component } from "react";
import CardView from "../Components/CardView";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getNewArrival } from "../Actions/StockActions";
import { Segment, Container, Breadcrumb, Responsive } from "semantic-ui-react";

const mapStatetoProps = state => {
  return {
    stock: state.stock
  };
};

const mapDispatchtoProps = dispatch => ({
  getNewArrival: limitPage => {
    dispatch(getNewArrival(limitPage));
  }
});

class Home extends Component {
  componentDidMount() {
    this.props.getNewArrival(20);
  }
  render() {
    return (
      <div style={{ backgroundColor: "#ebebeb" }}>
        <Responsive maxWidth={800}>
          <Segment
            style={{
              minHeight: "38em",
              backgroundColor: "#ebebeb"
            }}
          >
            <div>
              <br />
              <br />
              <Container>
                <Breadcrumb>
                  <Breadcrumb.Section as={Link} to="/Shop">
                    Shop
                  </Breadcrumb.Section>
                  <Breadcrumb.Divider icon="right angle" />
                  <Breadcrumb.Section>NewArrival</Breadcrumb.Section>
                </Breadcrumb>
              </Container>
              <br />
              <h1 align="center" style={{ fontFamily: "Prompt" }}>
                New Arrival
              </h1>
              <br />
              <CardView
                sheetList={this.props.stock.newArrival}
                center={true}
                limit={5}
              />
            </div>
          </Segment>
        </Responsive>

        <Responsive minWidth={801}>
          <Segment
            style={{
              minHeight: "38em",
              backgroundColor: "#ebebeb"
            }}
          >
            <div>
              <br />
              <br />
              <Container>
                <Breadcrumb>
                  <Breadcrumb.Section as={Link} to="/Shop">
                    Shop
                  </Breadcrumb.Section>
                  <Breadcrumb.Divider icon="right angle" />
                  <Breadcrumb.Section>NewArrival</Breadcrumb.Section>
                </Breadcrumb>
                <br />
                <h1 align="center" style={{ fontFamily: "Prompt" }}>
                  New Arrival
                </h1>
                <br />
                <CardView
                  sheetList={this.props.stock.newArrival}
                  center={true}
                  limit={5}
                />
              </Container>
            </div>
          </Segment>
        </Responsive>
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Home);
