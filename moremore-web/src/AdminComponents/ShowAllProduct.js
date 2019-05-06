import React from "react";
import { deleteProduct, isEdit } from "../Actions/AdminActions";
import { connect } from "react-redux";
import {
  Button,
  Card,
  Grid,
  Image,
  Container
} from "semantic-ui-react";

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
  <Container>
    <Grid stackable>
      <Grid.Row centered={true} columns={5}>
        {props.sheetList.data.map(sheet => {
          return (
            <Grid.Column>
              <Card>
                <Image src={sheet.img} />
                <Card.Content style={{ height: "80px" }}>
                  <Card.Header
                    style={{
                      fontSize: "1em",
                      fontFamily: "Prompt"
                    }}
                  >
				    {sheet.name}
                  </Card.Header>
                </Card.Content>
                <Grid>
                  <Grid.Row columns={2}>
                    <Grid.Column width={1} />
                    <Grid.Column width={3}>
                      <Button
                        onClick={() => {
                          props.deleteProduct(sheet.name, props.sheetList.data);
                        }}
                      >
                        ลบ
                      </Button>
                    </Grid.Column>
                    <Grid.Column width={3} />
                    <Grid.Column width={3}>
                      <Button
                        onClick={() => {
                          props.isEdit(true, sheet.name);
                        }}
                      >
                        แก้ไข
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Card>
            </Grid.Column>
          );
        })}
      </Grid.Row>
    </Grid>
    {/* <Grid>
      <Row>
        {props.sheetList.data.map(sheet => {
          return (
            <div>
              <Col sm={2}>
                <Card>
                  <CardImg width="100%" src={sheet.img} />
                  <CardBody>
                    <CardTitle align="left">{sheet.hiLight}</CardTitle>
                    <CardText align="left">
                      <Button
                        onClick={() => {
                          props.deleteProduct(sheet.name, props.sheetList.data);
                        }}
                      >
                        {" "}
                        {"ลบ"}
                      </Button>
                      &nbsp;&nbsp;&nbsp;
                      <Button
                        onClick={() => {
                          props.isEdit(true, sheet.name);
                        }}
                      >
                        {" "}
                        {"แก้ไข"}
                      </Button>
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            </div>
          );
        })}
      </Row>
    </Grid> */}
  </Container>
);

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(ShowAllProduct);
