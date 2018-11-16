import React from "react";
import { Card, CardImg, CardTitle, CardText, CardBody } from "reactstrap";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addProductToCart } from "../Actions/StockActions";

const mapStatetoProps = state => {
  return {
    stock: state.stock
  };
};

const mapDispatchtoProps = dispatch => ({
  addProductToCart: name => {
    dispatch(addProductToCart(name));
  }
});

const CardView = props => (
  <div className="container">
    <Grid>
      <Row>
        {props.list.data.map(res => {
          return (
            <Col sm={3}>
              <Card>
                <CardImg width="100%" src={res.img} />
                <CardBody>
                  <CardTitle align="left">
                    <Link to={"/DetailProduct/" + res.name}>{res.name}</Link>
                  </CardTitle>
                  <CardText align="left">
                    <p>{res.hiLight}</p>
                    <Button
                      onClick={() => {
                        props.addProductToCart(res.name);
                      }}
                    >
                      เพิ่มสินค้าลงในตะกร้า
                    </Button>
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

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(CardView);
