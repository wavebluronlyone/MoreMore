import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addSheetToCart } from "../Actions/StockActions";
import { Image, Card, Grid, Button, Responsive, Item } from "semantic-ui-react";

const mapStatetoProps = state => {
  return {
    stock: state.stock,
    user: state.user
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
            <Item key={sheet.name}>
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
                  {props.user.isLoggedIn ? (
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
                  ) : (
                    <Button
                      as={Link}
                      to="/Login"
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        fontFamily: "Prompt",
                        fontSize: "1em"
                      }}
                    >
                      Log In เพื่อเพิ่มสินค้าสู่ตะกร้า
                    </Button>
                  )}
                </Item.Description>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </Responsive>

    <Responsive minWidth={801}>
      <Grid stackable>
        <Grid.Row centered={props.center} columns={props.limit}>
          {props.sheetList.map(sheet => {
            return (
              <Grid.Column key={sheet.name}>
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
                  {props.user.isLoggedIn ? (
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
                  ) : (
                    <Button
                      as={Link}
                      to="/Login"
                      style={{
                        backgroundColor: "black",
                        color: "white",
                        fontFamily: "Prompt",
                        fontSize: "0.9em"
                      }}
                    >
                      Log In เพื่อเพิ่มสินค้าสู่ตะกร้า
                    </Button>
                  )}
                </Card>
                {props.limit === 5 ? <br /> : null}
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
