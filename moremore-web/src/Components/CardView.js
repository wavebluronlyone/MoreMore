import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardBody
} from "reactstrap";
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { getBestSeller } from "../Actions/StockActions";

const mapStatetoProps = state => {
  return {
    stock: state.stock
  };
};

const mapDispatchtoProps = dispatch => ({
  getBestSeller: () => {
    dispatch(getBestSeller());
  }
});

class CardView extends Component {
  componentDidMount() {
    this.props.getBestSeller();
  }
  render() {
    return (
      <div className="container">
        <Grid>
          <Row>
            {this.props.stock.data.map(res => {
              return (
                <Col sm={4}>
                  <Card>
                    <CardImg
                      top
                      width="100%"
                      src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardTitle align="left">
                        {res.name}
                      </CardTitle>
                      <CardText align="left">
                        <p>{res.short_description}</p>
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(CardView);
