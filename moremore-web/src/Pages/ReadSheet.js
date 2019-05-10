import React, { Component } from "react";
import { connect } from "react-redux";
import { findPdfWithSheetName, resetSheetPdf } from "../Actions/UserActions";
import { Document, Page } from "react-pdf";
import {
  Segment,
  Responsive,
  Grid,
  Breadcrumb,
  Container,
  Button,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Login from "./Login";
import axios from "axios";

const mapStatetoProps = state => {
  return {
    user: state.user,
    stock: state.stock
  };
};

const mapDispatchtoProps = dispatch => ({
  findPdfWithSheetName: (sheetName, email) => {
    dispatch(findPdfWithSheetName(sheetName, email));
  },
  resetSheetPdf: () => {
    dispatch(resetSheetPdf());
  }
});

class ReadSheet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
      fullWidth: 500,
      mobileWidth: 250,
      loaded: 0,
      loadraw: 0
    };
  }

  _handleKeyDown = event => {
    switch (event.keyCode) {
      case 37:
        this.goToPrevPage();
        break;
      case 39:
        this.goToNextPage();
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    this.props.findPdfWithSheetName(
      this.props.match.params.id,
      this.props.user.email
    );
    document.addEventListener("keydown", this._handleKeyDown);
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.email !== prevProps.user.email) {
      this.props.findPdfWithSheetName(
        this.props.match.params.id,
        this.props.user.email
      );
    }
    if (this.props.user.isLoggedIn === false) {
      this.props.history.push("/Login");
    }
  }

  componentWillUnmount() {
    this.setState({ numPages: null, pageNumber: 0 });
    this.props.resetSheetPdf();
    document.removeEventListener("keydown", this._handleKeyDown);
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages, pageNumber: 1 });
  };

  goToPrevPage = () => {
    if (this.state.pageNumber > 1)
      this.setState(state => ({ pageNumber: this.state.pageNumber - 1 }));
  };
  goToNextPage = () => {
    if (this.state.pageNumber < this.state.numPages)
      this.setState(state => ({ pageNumber: this.state.pageNumber + 1 }));
  };

  zoomInFull = () => {
    if (this.state.fullWidth <= 700)
      this.setState(state => ({ fullWidth: this.state.fullWidth + 100 }));
  };
  zoomOutFull = () => {
    if (this.state.fullWidth >= 200)
      this.setState(state => ({ fullWidth: this.state.fullWidth - 100 }));
  };

  zoomOutMobile = () => {
    if (this.state.mobileWidth >= 100)
      this.setState(state => ({ mobileWidth: this.state.mobileWidth - 50 }));
  };
  zoomInMobile = () => {
    if (this.state.mobileWidth <= 350)
      this.setState(state => ({ mobileWidth: this.state.mobileWidth + 50 }));
  };

  download = () => {
    this.setState({ loadraw: 0 });
    axios({
      url: "https://poomrokc.services:4243/" + this.props.user.pdf,
      method: "GET",
      responseType: "blob", // important
      onDownloadProgress: event => {
        this.setState({
          loadraw: Math.floor((100 * event.loaded) / event.total)
        });
      }
    }).then(response => {
      var data = new Blob([response.data], { type: "application/pdf" });
      var pdfURL = window.URL.createObjectURL(data);
      var tempLink = document.createElement("a");
      tempLink.href = pdfURL;
      tempLink.setAttribute("download", this.props.match.params.id + ".pdf");
      document.body.appendChild(tempLink);
      tempLink.click();
    });
  };

  render() {
    return (
      <div>
        {Boolean(localStorage.getItem("isloggedIn")) === true ? (
          <div>
            <Responsive maxWidth={800}>
              <Segment
                style={{
                  minHeight: "38em"
                }}
              >
                <div>
                  <br />
                  <br />
                  <Container>
                    <Breadcrumb>
                      <Breadcrumb.Section as={Link} to="/Profile">
                        Profile
                      </Breadcrumb.Section>
                      <Breadcrumb.Divider icon="right angle" />
                      <Breadcrumb.Section>
                        {this.props.match.params.id}
                      </Breadcrumb.Section>
                    </Breadcrumb>
                  </Container>
                  <br />
                  <Grid>
                    <Grid.Row centered>
                      <Button color="orange" onClick={this.download}>
                        Download as PDF
                      </Button>
                    </Grid.Row>
                    {this.state.loadraw !== 0 && this.state.loadraw !== 100 ? (
                      <Grid.Row centered>
                        Downloading {this.state.loadraw}%
                      </Grid.Row>
                    ) : null}
                    <Grid.Row centered>
                      <div>
                        <Button
                          icon
                          disabled={this.state.mobileWidth <= 50}
                          onClick={this.zoomOutMobile}
                        >
                          <Icon name="zoom-out" />
                        </Button>
                        <Button
                          icon
                          disabled={this.state.mobileWidth >= 400}
                          onClick={this.zoomInMobile}
                        >
                          <Icon name="zoom-in" />
                        </Button>
                      </div>
                    </Grid.Row>
                    <Grid.Row centered>
                      <div>
                        <Button
                          icon
                          disabled={this.state.pageNumber <= 1}
                          onClick={this.goToPrevPage}
                        >
                          <Icon name="left arrow" />
                        </Button>
                        <Button
                          icon
                          disabled={
                            this.state.pageNumber >= this.state.numPages
                          }
                          onClick={this.goToNextPage}
                        >
                          <Icon name="right arrow" />
                        </Button>
                      </div>
                    </Grid.Row>
                    <Grid.Row centered>
                      (สามารถใช้ปุ่มลูกศร ซ้าย ขวา บน Keyboard
                      เพื่อเปลี่ยนหน้าได้)
                    </Grid.Row>
                    <Grid.Row centered>
                      Page {this.state.pageNumber} of {this.state.numPages}
                    </Grid.Row>
                  </Grid>
                  {this.props.user.pdf !== "" ? (
                    <Grid stackable>
                      <Grid.Row centered>
                        <div
                          style={{
                            border: "1px solid black",
                            width: this.state.mobileWidth + 2,
                            marginBottom: "10px",
                            marginTop: "10px"
                          }}
                        >
                          <Document
                            file={
                              "https://poomrokc.services:4243/" +
                              this.props.user.pdf
                            }
                            onLoadProgress={event =>
                              this.setState({
                                loaded: Math.floor(
                                  (100 * event.loaded) / event.total
                                )
                              })
                            }
                            onLoadSuccess={this.onDocumentLoadSuccess}
                          >
                            <Page
                              pageNumber={this.state.pageNumber}
                              width={this.state.mobileWidth}
                            />
                          </Document>
                          {this.state.loaded !== 100
                            ? this.state.loaded + "%"
                            : null}
                        </div>
                      </Grid.Row>
                    </Grid>
                  ) : null}
                </div>
              </Segment>
            </Responsive>

            <Responsive minWidth={801}>
              <Segment
                style={{
                  minHeight: "38em"
                }}
              >
                <div>
                  <br />
                  <br />
                  <Container>
                    <Breadcrumb>
                      <Breadcrumb.Section as={Link} to="/Profile">
                        Profile
                      </Breadcrumb.Section>
                      <Breadcrumb.Divider icon="right angle" />
                      <Breadcrumb.Section>
                        {this.props.match.params.id}
                      </Breadcrumb.Section>
                    </Breadcrumb>
                  </Container>
                  <Grid>
                    <Grid.Row centered>
                      <Button color="orange" onClick={this.download}>
                        Download as PDF
                      </Button>
                    </Grid.Row>
                    {this.state.loadraw !== 0 && this.state.loadraw !== 100 ? (
                      <Grid.Row centered>
                        Downloading {this.state.loadraw}%
                      </Grid.Row>
                    ) : null}
                    <Grid.Row centered>
                      <div>
                        <Button
                          icon
                          disabled={this.state.fullWidth <= 100}
                          onClick={this.zoomOutFull}
                        >
                          <Icon name="zoom-out" />
                        </Button>
                        <Button
                          icon
                          disabled={this.state.fullWidth >= 800}
                          onClick={this.zoomInFull}
                        >
                          <Icon name="zoom-in" />
                        </Button>
                      </div>
                    </Grid.Row>
                    <Grid.Row centered>
                      <div>
                        <Button
                          icon
                          disabled={this.state.pageNumber <= 1}
                          onClick={this.goToPrevPage}
                        >
                          <Icon name="left arrow" />
                        </Button>
                        <Button
                          icon
                          disabled={
                            this.state.pageNumber >= this.state.numPages
                          }
                          onClick={this.goToNextPage}
                        >
                          <Icon name="right arrow" />
                        </Button>
                      </div>
                    </Grid.Row>
                    <Grid.Row centered>
                      (สามารถใช้ปุ่มลูกศร ซ้าย ขวา บน Keyboard
                      เพื่อเปลี่ยนหน้าได้)
                    </Grid.Row>
                    <Grid.Row centered>
                      Page {this.state.pageNumber} of {this.state.numPages}
                    </Grid.Row>
                  </Grid>
                  {this.props.user.pdf !== "" ? (
                    <Grid>
                      <Grid.Row centered>
                        <div
                          style={{
                            border: "1px solid black",
                            width: this.state.fullWidth + 2
                          }}
                        >
                          <Document
                            file={
                              "https://poomrokc.services:4243/" +
                              this.props.user.pdf
                            }
                            onLoadProgress={event =>
                              this.setState({
                                loaded: Math.floor(
                                  (100 * event.loaded) / event.total
                                )
                              })
                            }
                            onLoadSuccess={this.onDocumentLoadSuccess}
                          >
                            <Page
                              pageNumber={this.state.pageNumber}
                              width={this.state.fullWidth}
                            />
                          </Document>
                          {this.state.loaded !== 100
                            ? this.state.loaded + "%"
                            : null}
                        </div>
                      </Grid.Row>
                    </Grid>
                  ) : null}
                </div>
              </Segment>
            </Responsive>
          </div>
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(ReadSheet);
