import React from "react";
import { deleteProduct, isEdit } from "../Actions/AdminActions";
import { connect } from "react-redux";
import { Button, Card, Grid, Image, Container } from "semantic-ui-react";

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
                <Button
                  onClick={() => {
                    props.deleteProduct(sheet.name, props.sheetList.data);
                  }}
                >
                  ลบ
                </Button>
                <div style={{ marginBottom: "1em" }} />
                <Button
                  onClick={() => {
                    props.isEdit(true, sheet.name);
                  }}
                >
                  แก้ไข
                </Button>
              </Card>
            </Grid.Column>
          );
        })}
      </Grid.Row>
    </Grid>
  </Container>
);

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(ShowAllProduct);
