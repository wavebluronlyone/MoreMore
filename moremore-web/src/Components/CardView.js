import React from "react";
import { Card, CardImg, CardTitle, CardText, CardBody } from "reactstrap";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addSheetToCart } from "../Actions/StockActions";

const mapStatetoProps = state => {
  return {
    stock: state.stock
  };
};

const mapDispatchtoProps = dispatch => ({
  addSheetToCart: (sheetName, sheetPrice, sheetAddCart) => {
    dispatch(addSheetToCart(sheetName, sheetPrice, sheetAddCart));
  }
});

const CardView = props => (
  <div className="container">
    <Grid>
      <Row>
        <Col sm={1} />
        {props.sheetList.map(sheet => {
          return (
            <div>
              <Col sm={2}>
                <Card>
                  <CardImg width="100%" src={sheet.img} />
                  <CardBody>
                    <CardTitle align="left">
                      <Link to={"/DetailSheet/" + sheet.name}>
                        {sheet.name}
                      </Link>
                    </CardTitle>
                    <CardText align="left">
                      <p>{sheet.hiLight}</p>
                      <Button
                        onClick={() => {
                          props.addSheetToCart(
                            sheet.name,
                            sheet.price,
                            props.stock.addCart
                          );
                        }}
                      >
                        เพิ่มสินค้าลงในตะกร้า
                      </Button>
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            </div>
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
