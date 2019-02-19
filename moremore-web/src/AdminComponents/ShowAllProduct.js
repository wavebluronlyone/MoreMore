import React from "react";
import { Card, CardImg, CardTitle, CardBody, CardText } from "reactstrap";
import { Grid, Row, Col } from "react-bootstrap";
import { deleteProduct, isEdit } from "../Actions/AdminActions";
import { connect } from "react-redux";

const mapStatetoProps = state => {
  return {
    admin: state.admin
  };
};

const mapDispatchtoProps = dispatch => ({
  isEdit: (boolean, sheetName) => {
    dispatch(isEdit(boolean, sheetName));
  },
  deleteProduct: (sheetName, sheetData) => {
    dispatch(deleteProduct(sheetName, sheetData));
  }
});

const ShowAllProduct = props => (
  <div className="container">
    <Grid>
      <Row>
        <Col sm={1} />
        {props.sheetList.data.map(sheet => {
          return (
            <div>
              <Col sm={2}>
                <Card>
                  <CardImg width="100%" src={sheet.img} />
                  <CardBody>
                    <CardTitle align="left">{sheet.hiLight}</CardTitle>
                    <CardText align="left">
                      <a
                        className="linker"
                        onClick={() => {
                          props.deleteProduct(sheet.name, props.list.data);
                        }}
                      >
                        {" "}
                        {"ลบ"}
                      </a>
                      <a
                        className="linker"
                        onClick={() => {
                          props.isEdit(true, sheet.name);
                        }}
                      >
                        {" "}
                        {"แก้ไข"}
                      </a>
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
)(ShowAllProduct);
