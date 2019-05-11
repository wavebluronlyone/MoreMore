import React, { Component } from "react";
import { connect } from "react-redux";
import {
  removeSheetCart,
  createLinePayment,
  linkPayment,
  createPromptPay
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
  Modal,
  Header,
  Input
} from "semantic-ui-react";
import DateTime from "react-datetime";
import linepay from "../Image/linepay_logo.png";
import promptpay from "../Image/prompt.jpg";
import qr from "../Image/qr.png";
require("moment/locale/th");

const month = [
  ["Jan", "ม.ค."],
  ["Feb", "ก.พ."],
  ["Mar", "มี.ค."],
  ["Apr", "เม.ย."],
  ["May", "พ.ค."],
  ["Jun", "มิ.ย."],
  ["Jul", "ก.ค."],
  ["Aug", "ส.ค."],
  ["Sep", "ก.ย."],
  ["Oct", "ต.ค."],
  ["Nov", "พ.ย."],
  ["Dec", "ธ.ค."]
];

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
  },
  createPromptPay: (fourDigit, totalSheetPrices, time) => {
    dispatch(createPromptPay(fourDigit, totalSheetPrices, time));
  }
});

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      date: "",
      num: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.stock.transactionId !== prevProps.stock.transactionId &&
      this.props.stock.url !== "error" &&
      this.props.stock.url !== "loading"
    ) {
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

  closeModal = () => {
    this.setState({ showModal: false });
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  handleDateChange = date => {
    var d = date._d;
    var dat = d.getDate().toString();
    var mon = month[d.getMonth()][1];
    var year = (d.getFullYear() + 543).toString();
    var hr = d.getHours().toString();
    var mn = d.getMinutes().toString();
    if (hr.length < 2) hr = "0" + hr;
    if (mn.length < 2) mn = "0" + mn;
    this.setState({
      date: dat + " " + mon + " " + year + " - " + hr + "." + mn
    });
  };

  handleNumChange = event => {
    this.setState({ num: event.target.value.trim() });
  };

  createPromptPay = () => {
    this.props.createPromptPay(
      this.state.num,
      this.props.stock.totalPrices.toString() + ".00",
      this.state.date
    );
  };

  render() {
    return (
      <div>
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
                          <Item.Header style={{ fontFamily: "Prompt" }}>
                            {sheet.name}
                          </Item.Header>
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
                        color: "#000000",
                        cursor: "default"
                      }}
                      attached="bottom"
                    >
                      <h2 style={{ fontFamily: "Prompt" }}>
                        ชำระเงินผ่าน{" "}
                        <Image
                          style={{ cursor: "pointer" }}
                          centered
                          width="150em"
                          height="50em"
                          src={linepay}
                          onClick={() => {
                            this.props.createLinePayment(
                              this.props.stock.totalPrices
                            );
                          }}
                        />
                        <Modal
                          closeIcon
                          style={{ overflow: "auto" }}
                          open={this.state.showModal}
                          onClose={this.closeModal}
                          trigger={
                            <Image
                              style={{ cursor: "pointer" }}
                              centered
                              width="150em"
                              height="50em"
                              src={promptpay}
                              onClick={this.openModal}
                            />
                          }
                          className="scrolling"
                        >
                          <Modal.Header>
                            ชำระเงินและยืนยันหลักฐานการโอน
                          </Modal.Header>
                          <Modal.Content image>
                            <Image wrapped size="medium" src={qr} />
                            <Modal.Description>
                              <Header style={{ marginTop: "-10px" }}>
                                ชำระเงินเพียง 2 ขั้นตอน (หากทำไม่ครบ
                                ระบบจะไม่สามารถยืนยันได้)
                              </Header>
                              {this.props.stock.url === "error" ? (
                                <Message negative style={{ width: "100%" }}>
                                  <Message.Content>
                                    <Message.Header>Error</Message.Header>
                                    <p style={{ fontFamily: "Prompt" }}>
                                      ไม่พบรายการโอนเงินดังกล่าว
                                    </p>
                                  </Message.Content>
                                </Message>
                              ) : null}
                              <p>
                                1.<b>โอนเงิน</b> ผ่านปุ่ม Promptpay หรือแสน QR
                                Code ผ่านแอพธนาคาร{" "}
                                <b>
                                  **บัญชีที่ใช้โอนไม่จำเป็นต้องผ่านการสมัคร
                                  Promptpay ก็ได้
                                </b>{" "}
                                จำนวนเงิน
                              </p>
                              <h3 style={{ textAlign: "center" }}>
                                <b>{this.props.stock.totalPrices}.00 บาท</b>
                              </h3>
                              <br />
                              <p>
                                2.รออย่างน้อย 1 นาที
                                แล้วกรอกฟอร์มตรวจสอบด้านล่าง<b>ให้ถูกต้อง</b>
                              </p>
                              <h3>ตรวจสอบรายการโอนเงินและรับชีททันที</h3>
                              <p>
                                <b>
                                  1.เลขบัญชีที่ใช้โอน 4 หลักสุดท้าย
                                  (ดูจากสลิปหรือแอปที่ใช้โอน) เช่น 4567
                                </b>
                              </p>
                              <Input
                                focus
                                placeholder="XXXX"
                                onChange={this.handleNumChange}
                              />
                              <p style={{ marginTop: "20px" }}>
                                <b>
                                  2.วันที่และเวลาที่โอน (อ้างอิงจากสลิป
                                  เวลาให้ปัดลงหากมีหน่วยวินาทีในสลิป เช่น
                                  16.49.50 ให้กรอก 16.49 หากยังไม่ได้
                                  ให้ลองนาทีที่ติดกัน 1 เช่น 16.50 กับ 16.48
                                  หากไม่ได้ภายใน 5 นาที รบกวนติดต่อทาง Inbox
                                  Page Facebook เลยครับ)
                                </b>
                              </p>
                              <DateTime
                                style={{ border: "1px solid black" }}
                                input={false}
                                onChange={this.handleDateChange}
                              />
                              {this.props.stock.url === "loading" ||
                              this.props.stock.transactionId !== "" ? (
                                <Button
                                  positive
                                  loading
                                  style={{ marginTop: "20px" }}
                                >
                                  Loading
                                </Button>
                              ) : (
                                <Button
                                  onClick={this.createPromptPay}
                                  style={{ marginTop: "20px" }}
                                  positive
                                >
                                  กดรับชีทได้ทันที
                                </Button>
                              )}
                            </Modal.Description>
                          </Modal.Content>
                        </Modal>
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
                      ชำระเงินผ่าน{" "}
                      <Image
                        centered
                        width="150em"
                        height="50em"
                        src={promptpay}
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
