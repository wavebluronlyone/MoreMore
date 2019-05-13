import React, { Component } from "react";
import CardView from "../Components/CardView";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getBestSeller } from "../Actions/StockActions";
import { Container, Breadcrumb, Responsive, Segment } from "semantic-ui-react";

const mapStatetoProps = state => {
  return {
    stock: state.stock,
    user: state.user
  };
};

const mapDispatchtoProps = dispatch => ({
  getBestSeller: limitPage => {
    dispatch(getBestSeller(limitPage));
  }
});

class Home extends Component {
  componentDidMount() {
    this.props.getBestSeller(5);
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
                  <Breadcrumb.Section>BestSeller</Breadcrumb.Section>
                </Breadcrumb>
              </Container>
              <br />
              <h1 align="center" style={{ fontFamily: "Prompt" }}>
                Best Seller
              </h1>
              <br />
              <CardView
                sheetList={this.props.stock.bestSeller}
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
                  <Breadcrumb.Section>BestSeller</Breadcrumb.Section>
                </Breadcrumb>
                <br />
                <h1 align="center" style={{ fontFamily: "Prompt" }}>
                  Best Seller
                </h1>
                <br />
                <CardView
                  sheetList={this.props.stock.bestSeller}
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
