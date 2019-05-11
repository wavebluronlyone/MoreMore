import React, { Component } from "react";
import SheetDescription from "../Components/SheetDescription";
import { connect } from "react-redux";
import {
  findSheetDataWithSheetName,
  addSheetToCart,
  createSlideImage,
  findSheetDataWithProfile,
  resetImage
} from "../Actions/StockActions";
import {
  findProfileWithEmail,
  addComment,
  getComment,
  resetComment
} from "../Actions/UserActions";
import Slide from "../Components/Slide";
import { Link } from "react-router-dom";
import {
  Segment,
  Message,
  Grid,
  Button,
  Container,
  Responsive,
  Comment,
  Header,
  Form,
  Breadcrumb,
  Image,
  Icon
} from "semantic-ui-react";
import { Carousel } from "react-bootstrap";
import CardView from "../Components/CardView";
import ReviewComment from "../Components/ReviewComment";

const mapStatetoProps = state => {
  return {
    user: state.user,
    stock: state.stock
  };
};

const mapDispatchtoProps = dispatch => ({
  findSheetDataWithSheetName: sheetName => {
    dispatch(findSheetDataWithSheetName(sheetName));
  },
  findSheetDataWithProfile: (profile, sheetName) => {
    dispatch(findSheetDataWithProfile(profile, sheetName));
  },
  addSheetToCart: (sheetName, sheetPrice, sheetImage, sheetAddCart) => {
    dispatch(addSheetToCart(sheetName, sheetPrice, sheetImage, sheetAddCart));
  },
  createSlideImage: sheetName => {
    dispatch(createSlideImage(sheetName));
  },
  findProfileWithEmail: email => {
    dispatch(findProfileWithEmail(email));
  },
  addComment: (comment, user, sheetName) => {
    dispatch(addComment(comment, user, sheetName));
  },
  getComment: sheetName => {
    dispatch(getComment(sheetName));
  },
  resetImage: () => {
    dispatch(resetImage());
  },
  resetComment: () => {
    dispatch(resetComment());
  }
});

class DetailSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      showExample: false
    };
    this.handleCommentOnChange = this.handleCommentOnChange.bind(this);
  }
  componentDidMount() {
    this.props.getComment(this.props.match.params.id);
    this.props.findProfileWithEmail(this.props.user.email);
    this.props.findSheetDataWithSheetName(this.props.match.params.id);
    this.props.createSlideImage(this.props.match.params.id);
  }
  componentDidUpdate(prevProps) {
    if (this.props.stock.profile !== prevProps.stock.profile) {
      this.props.findSheetDataWithProfile(
        this.props.stock.profile,
        this.props.match.params.id
      );
    }
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.props.resetComment();
      this.props.findSheetDataWithSheetName(this.props.match.params.id);
      this.props.createSlideImage(this.props.match.params.id);
      this.props.getComment(this.props.match.params.id);
    }
    if (this.props.user.email !== prevProps.user.email) {
      this.props.findProfileWithEmail(this.props.user.email);
    }
    if (
      this.props.user.commentArray.length > prevProps.user.commentArray.length
    ) {
      this.props.getComment(this.props.match.params.id);
    }
  }
  componentWillUnmount() {
    this.props.resetImage();
    this.props.resetComment();
  }
  handleCommentOnChange(event) {
    this.setState({ comment: event.target.value });
  }
  handleSubmit(comment, username, sheetName) {
    this.props.addComment(comment, username, sheetName);
    this.setState({ comment: "" });
  }

  render() {
    if (!this.state.showExample)
      return (
        <div>
          <Responsive maxWidth={800}>
            {this.props.stock.message !== "" ? (
              <div>
                {this.props.stock.message !== undefined ? (
                  <div align="center">
                    <Message style={{ width: "100%" }} positive>
                      <br />
                      <p style={{ fontFamily: "Prompt" }}>
                        {this.props.stock.message}
                      </p>
                    </Message>
                  </div>
                ) : null}
              </div>
            ) : null}
          </Responsive>

          <Responsive minWidth={801}>
            {this.props.stock.message !== "" ? (
              <Container>
                <br />
                {this.props.stock.message !== undefined ? (
                  <Message positive>
                    <p style={{ fontFamily: "Prompt" }}>
                      {this.props.stock.message}
                    </p>
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
            <br />
            {this.props.stock.price !== 0 ? (
              <div>
                <Container>
                  <Breadcrumb>
                    <Breadcrumb.Section as={Link} to="/Shop">
                      Shop
                    </Breadcrumb.Section>
                    <Breadcrumb.Divider icon="right angle" />
                    <Breadcrumb.Section>
                      {this.props.match.params.id}
                    </Breadcrumb.Section>
                  </Breadcrumb>
                  <br />
                  <br />
                  <Grid stackable>
                    <Grid.Row columns={2} centered>
                      <Grid.Column
                        width={4}
                        onClick={() => {
                          this.setState({ showExample: true });
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <p align="center"
                          style={{
                            fontFamily: "Prompt"
                          }}
                        >
                          คลิกที่ภาพเพื่อขยาย
                        </p>
                        <Slide multipleImageList={this.props.stock.subImg} />
                      </Grid.Column>
                      <Grid.Column>
                        <h2
                          style={{
                            fontFamily: "Prompt"
                          }}
                        >
                          {this.props.match.params.id}
                        </h2>
                        <h2
                          style={{
                            fontFamily: "Prompt"
                          }}
                        >
                          {this.props.stock.price + " บาท"}
                        </h2>
                        <SheetDescription
                          sheetDetail={this.props.stock.longDetail}
                        />
                        <br />
                        {this.props.user.isLoggedIn?(
                          <Button
                            style={{
                              backgroundColor: "black",
                              color: "white",
                              fontFamily: "Prompt"
                            }}
                            onClick={() => {
                              this.props.addSheetToCart(
                                this.props.match.params.id,
                                this.props.stock.price,
                                this.props.stock.img,
                                this.props.stock.addCart
                              );
                            }}
                          >
                            เพิ่มสินค้าลงในตะกร้า
                          </Button>):(
                          <Button
                            style={{
                              backgroundColor: "black",
                              color: "white",
                              fontFamily: "Prompt"
                            }}
                            as={Link}
					        to="/Login"
                          >
                            Log In เพื่อเพิ่มสินค้าสู่ตะกร้า
                          </Button>)
					    }
                        <br />
                        <br />
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                  <br />
                  {this.props.stock.sheetDataProfile.length > 0 ? (
                    <div>
                      <h1 style={{ fontFamily: "Prompt" }}>
                        ชีทจากผู้เขียนคนนี้
                      </h1>
                      <CardView
                        sheetList={this.props.stock.sheetDataProfile}
                        centered={false}
                      />
                    </div>
                  ) : null}
                  <br />
                  <Comment.Group>
                    <Header as="h1" style={{ fontFamily: "Prompt" }} dividing>
                      รีวิวจากลูกค้า
                    </Header>
                    <ReviewComment commentList={this.props.user.commentArray} />
                    {Boolean(localStorage.getItem("isloggedIn")) === true ? (
                      <Form
                        onSubmit={() => {
                          this.handleSubmit(
                            this.state.comment,
                            this.props.user.username,
                            this.props.match.params.id
                          );
                        }}
                      >
                        <Form.TextArea
                          value={this.state.comment}
                          onChange={this.handleCommentOnChange}
                        />
                        <Button
                          style={{
                            backgroundColor: "black",
                            color: "white",
                            fontFamily: "Prompt"
                          }}
                          content="เพิ่มรีวิวชีทสรุป"
                          labelPosition="left"
                          icon="edit"
                        />
                      </Form>
                    ) : null}
                  </Comment.Group>
                </Container>
              </div>
            ) : (
              <div>
                <p>กรุณารอสักครู่...</p>
              </div>
            )}
          </Segment>
        </div>
      );
    else
      return (
        <div
          style={{
            width: "100vw",
            height: "100vh",
            backgroundColor: "black",
            position: "fixed",
            top: "0px",
            zIndex: "1000"
          }}
        >
          <Button
            icon
            style={{
              marginTop: "20px",
              marginLeft: "auto",
              marginRight: "auto",
              display: "block"
            }}
            color="white"
            onClick={() => {
              this.setState({ showExample: false });
            }}
          >
            <Icon name="close icon" />
          </Button>
          <Carousel
            style={{
              width: "100vw",
              height: "90vh",
              position: "absolute",
              bottom: "0px"
            }}
          >
            {this.props.stock.subImg.map(image => {
              return (
                <Carousel.Item>
                  <Image
                    src={image}
                    style={{
                      objectFit: "contain",
                      marginLeft: "auto",
                      marginRight: "auto"
                    }}
                  />
                  <Carousel.Caption />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </div>
      );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(DetailSheet);
