import React, { Component } from "react";
import { connect } from "react-redux";
import {
  findPdfWithSheetName,
  isLoggedIn,
  resetSheetPdf
} from "../Actions/UserActions";
import { Document, Page } from "react-pdf";
import {
  Segment,
  Responsive,
  Grid,
  Breadcrumb,
  Container
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Login from "./Login";

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
    this.state = { numPages: null, pageNumber: 1, arrPage: [1] };
  }

  componentDidMount() {
    this.props.findPdfWithSheetName(
      this.props.match.params.id,
      this.props.user.email
    );
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
    this.setState({ numPages: null, pageNumber: 1, arrPage: [1] });
    this.props.resetSheetPdf();
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
    for (let i = 1; i < numPages; i++) {
      this.state.arrPage[i] = i + 1;
    }
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
                  {this.props.user.pdf !== "" ? (
                    <Document
                      file={
                        "https://cors-anywhere.herokuapp.com/" +
                        this.props.user.pdf
                      }
                      onLoadSuccess={this.onDocumentLoadSuccess}
                    >
                      <Grid stackable>
                        <Grid.Row centered>
                          {this.state.arrPage.map(index => {
                            return <Page pageNumber={index} width={350} />;
                          })}
                        </Grid.Row>
                      </Grid>
                    </Document>
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
                  {this.props.user.pdf !== "" ? (
                    <Document
                      file={
                        "https://cors-anywhere.herokuapp.com/" +
                        this.props.user.pdf
                      }
                      onLoadSuccess={this.onDocumentLoadSuccess}
                    >
                      <Grid>
                        <Grid.Row centered>
                          {this.state.arrPage.map(index => {
                            return (
                              <div>
                                <Grid.Column />
                                <Grid.Column>
                                  <Page pageNumber={index} width={800} />
                                </Grid.Column>
                              </div>
                            );
                          })}
                        </Grid.Row>
                      </Grid>
                    </Document>
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
