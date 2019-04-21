import React, { Component } from "react";
import { connect } from "react-redux";
import {
  removeSheetCart,
  createLinePayment,
  linkPayment
} from "../Actions/StockActions";
import { Link } from "react-router-dom";
import {
  Segment,
  Button,
  Item,
  Container,
  Message,
  Icon,
  Image,
  Responsive,
  Grid
} from "semantic-ui-react";
import linepay from "../Image/linepay_logo.png";

const mapStatetoProps = state => {
  return {
    stock: state.stock,
    user: state.user
  };
};

const mapDispatchtoProps = dispatch => ({
  removeSheetCart: (sheetName, sheetAddCart) => {
    dispatch(removeSheetCart(sheetName, sheetAddCart));
  },
  createLinePayment: totalSheetPrices => {
    dispatch(createLinePayment(totalSheetPrices));
  }
});

class Cart extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.stock.transactionId !== prevProps.stock.transactionId) {
      linkPayment(
        this.props.stock.addCart,
        this.props.stock.url,
        this.props.stock.transactionId,
        this.props.stock.orderId,
        this.props.stock.price,
        this.props.user.email
      );
    }
  }
  render() {
    return (
      <div>
        <Responsive maxWidth={800}>
          {this.props.stock.message ===
          "กรุณารอสักครู่ระบบกำลังเข้าสู่ line pay" ? (
            <div>
              {this.props.stock.message !== undefined ? (
                <div align="center">
                  <br />
                  <Message
                    style={{ position: "fixed", zIndex: 1, width: "100%" }}
                    icon
                  >
                    <Icon name="circle notched" loading />
                    <Message.Content>
                      <Message.Header>Loading</Message.Header>
                      <p style={{ fontFamily: "Prompt" }}>
                        {this.props.stock.message}
                      </p>
                    </Message.Content>
                  </Message>
                </div>
              ) : null}
            </div>
          ) : null}
        </Responsive>

        <Responsive minWidth={801}>
          {this.props.stock.message ===
          "กรุณารอสักครู่ระบบกำลังเข้าสู่ line pay" ? (
            <Container>
              {this.props.stock.message !== undefined ? (
                <Message icon>
                  <Icon name="circle notched" loading />
                  <Message.Content>
                    <Message.Header>Loading</Message.Header>
                    <p style={{ fontFamily: "Prompt" }}>
                      {this.props.stock.message}
                    </p>
                  </Message.Content>
                </Message>
              ) : null}
            </Container>
          ) : null}
        </Responsive>
        <Segment
          style={{
            minHeight: "38em"
          }}
        >
          {this.props.stock.totalPrices === 0 ? (
            <div>
              <br />
              <br />
              <p>{"คุณยังไม่ได้เลือกสินค้า"}</p>
            </div>
          ) : (
            <div>
              <br />
              <h1 style={{ fontFamily: "Prompt" }} align="center">
                Order Summary
              </h1>
              <br />
              <br />
              <Container style={{ fontFamily: "Prompt" }}>
                <Item.Group divided unstackable>
                  {this.props.stock.addCart.map(sheet => {
                    return (
                      <Item>
                        <Item.Image
                          style={{ width: "100px", height: "100px" }}
                          src={sheet.img}
                        />
                        <Item.Content>
                          <Item.Header>{sheet.name}</Item.Header>
                          <Item.Description>
                            <span className="price">
                              {sheet.price + " บาท"}
                            </span>
                            <br />
                            <br />
                            <Button
                              onClick={() => {
                                this.props.removeSheetCart(
                                  sheet,
                                  this.props.stock.addCart,
                                  this.props.stock.arrPrices
                                );
                              }}
                            >
                              ลบ
                            </Button>
                          </Item.Description>
                        </Item.Content>
                      </Item>
                    );
                  })}
                </Item.Group>
                <hr />
                <h1 align="right" style={{ fontFamily: "Prompt" }}>
                  {" "}
                  รวม &nbsp; {this.props.stock.totalPrices} บาท
                </h1>
                <br />
                <br />
                {this.props.user.isLoggedIn === true ? (
                  <div>
                    <Button
                      style={{
                        fontFamily: "Prompt",
                        fontSize: "0.9em",
                        backgroundColor: "#fbb900",
                        color: "#000000"
                      }}
                      attached="bottom"
                      onClick={() => {
                        this.props.createLinePayment(
                          this.props.stock.totalPrices
                        );
                      }}
                    >
                      <h2 style={{ fontFamily: "Prompt" }}>
                        คลิกเพื่อชำระเงินผ่าน{" "}
                        <Image
                          centered
                          width="150em"
                          height="50em"
                          src={linepay}
                        />{" "}
                      </h2>
                    </Button>
                  </div>
                ) : (
                  <Button
                    style={{
                      fontFamily: "Prompt",
                      fontSize: "0.9em",
                      backgroundColor: "#fbb900",
                      color: "#000000"
                    }}
                    attached="bottom"
                    as={Link}
                    to="/Login"
                  >
                    <h2 style={{ fontFamily: "Prompt" }}>
                      คลิกเพื่อชำระเงินผ่าน{" "}
                      <Image
                        centered
                        width="150em"
                        height="50em"
                        src={linepay}
                      />{" "}
                    </h2>
                  </Button>
                )}
              </Container>
            </div>
          )}
        </Segment>
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Cart);
