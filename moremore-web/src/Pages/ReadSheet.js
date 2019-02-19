import React, { Component } from "react";
import { connect } from "react-redux";
import Navigationbar from "../Components/Navigationbar";
import {
  findPdfWithSheetName,
  isLoggedIn,
  resetSheetPdf
} from "../Actions/UserActions";
import { Document, Page } from "react-pdf";
import { Grid, Col, Row } from "react-bootstrap";

const mapStatetoProps = state => {
  return {
    user: state.user,
    stock: state.stock
  };
};

const mapDispatchtoProps = dispatch => ({
  isLoggedIn: () => {
    dispatch(isLoggedIn());
  },
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

  componentWillMount() {
    this.props.isLoggedIn();
    this.props.findPdfWithSheetName(
      this.props.match.params.id,
      this.props.user.email
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user.email !== nextProps.user.email) {
      this.props.findPdfWithSheetName(
        this.props.match.params.id,
        nextProps.user.email
      );
    }
    if (nextProps.user.isLoggedIn === false) {
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
        {this.props.user.isLoggedIn === true ? (
          <div>
            <Navigationbar show={true} />
            <div>
              <br />
              <br />
              {this.props.user.pdf !== "" ? (
                <Document
                  file={
                    "https://cors-anywhere.herokuapp.com/" + this.props.user.pdf
                  }
                  onLoadSuccess={this.onDocumentLoadSuccess}
                >
                  <Grid>
                    <Row>
                      {this.state.arrPage.map(index => {
                        return (
                          <div>
                            <Col sm={2} />
                            <Col>
                              <Page pageNumber={index} width={800} />
                            </Col>
                          </div>
                        );
                      })}
                    </Row>
                  </Grid>
                </Document>
              ) : null}
            </div>
          </div>
        ) : (
          <Navigationbar show={false} />
        )}
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(ReadSheet);
