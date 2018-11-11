import React from "react";
import { Card, CardImg, CardTitle, CardBody, CardText } from "reactstrap";
import { Grid, Row, Col } from "react-bootstrap";
import { deleteProduct, isEdit } from "../Actions/AdminAction";
import { connect } from "react-redux";

const mapStatetoProps = state => {
  return {
    admin: state.admin
  };
};

const mapDispatchtoProps = dispatch => ({
  isEdit: (boolean, name) => {
    dispatch(isEdit(boolean, name));
  }
});

const ShowAllProduct = props => (
  <div className="container">
    <Grid>
      <Row>
        {props.list.data.map(res => {
          return (
            <Col sm={3}>
              <Card>
                <CardImg top width="100%" src={res.img} />
                <CardBody>
                  <CardTitle align="left">{res.hiLight}</CardTitle>
                  <CardText align="left">
                    <a
                      className="linker"
                      onClick={() => {
                        deleteProduct(res.name);
                      }}
                    >
                      {" "}
                      {"ลบ"}
                    </a>
                    <a
                      className="linker"
                      onClick={() => {
                        props.isEdit(true, res.name);
                      }}
                    >
                      {" "}
                      {"แก้ไข"}
                    </a>
                    <br />
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
)(ShowAllProduct);
