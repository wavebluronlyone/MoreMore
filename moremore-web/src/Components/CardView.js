import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addSheetToCart } from "../Actions/StockActions";
import { Image, Card, Grid, Button, Responsive, Item } from "semantic-ui-react";

const mapStatetoProps = state => {
  return {
    stock: state.stock
  };
};

const mapDispatchtoProps = dispatch => ({
  addSheetToCart: (sheetName, sheetPrice, sheetImage, sheetAddCart) => {
    dispatch(addSheetToCart(sheetName, sheetPrice, sheetImage, sheetAddCart));
  }
});

const CardView = props => (
  <div>
    <Responsive maxWidth={800}>
      <Item.Group divided unstackable>
        {props.sheetList.map(sheet => {
          return (
            <Item>
              <Item.Image src={sheet.img} />
              <Item.Content>
                <Item.Header
                  style={{
                    fontSize: "1em",
                    fontFamily: "Prompt"
                  }}
                >
                  {" "}
                  <Link to={"/DetailSheet/" + sheet.name}>{sheet.name}</Link>
                </Item.Header>
                <Item.Description
                  style={{
                    fontSize: "0.8em",
                    fontFamily: "Prompt"
                  }}
                >
                  <span>{sheet.hiLight}</span>
                  <br />
                  <br />
                  <Button
                    onClick={() => {
                      props.addSheetToCart(
                        sheet.name,
                        sheet.price,
                        sheet.img,
                        props.stock.addCart
                      );
                    }}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      fontFamily: "Prompt",
                      fontSize: "1em"
                    }}
                  >
                    เพิ่มสินค้าลงในตะกร้า
                  </Button>
                </Item.Description>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </Responsive>

    <Responsive minWidth={801}>
      <Grid stackable>
        <Grid.Row centered={props.center} columns={6}>
          {props.sheetList.map(sheet => {
            return (
              <Grid.Column>
                <Card>
                  <Image src={sheet.img} />
                  <Card.Content style={{ height: "120px" }}>
                    <Card.Header
                      style={{
                        fontSize: "1em",
                        fontFamily: "Prompt"
                      }}
                    >
                      <Link to={"/DetailSheet/" + sheet.name}>
                        {sheet.name}
                      </Link>
                    </Card.Header>
                    <Card.Description
                      style={{
                        fontSize: "0.8em",
                        fontFamily: "Prompt"
                      }}
                    >
                      {sheet.hiLight}
                    </Card.Description>
                  </Card.Content>
                  <Button
                    onClick={() => {
                      props.addSheetToCart(
                        sheet.name,
                        sheet.price,
                        sheet.img,
                        props.stock.addCart
                      );
                    }}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      fontFamily: "Prompt",
                      fontSize: "0.9em"
                    }}
                  >
                    เพิ่มสินค้าลงในตะกร้า
                  </Button>
                </Card>
              </Grid.Column>
            );
          })}
        </Grid.Row>
      </Grid>
    </Responsive>
  </div>
);

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(CardView);
