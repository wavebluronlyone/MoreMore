import React, { Component } from "react";
import { connect } from "react-redux";
import {
  findPdfWithSheetName,
  resetSheetPdf
} from "../Actions/UserActions";
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
    this.state = { numPages: null, pageNumber: 1, fullWidth: 500, mobileWidth: 250};
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
    this.setState({ numPages: null, pageNumber: 0});
    this.props.resetSheetPdf();
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages ,pageNumber:1});
  };
  
  goToPrevPage = () => {
	if(this.state.pageNumber>1)
		this.setState(state => ({ pageNumber: this.state.pageNumber - 1 }));
  }
  goToNextPage = () => {
	if(this.state.pageNumber<this.state.numPages)
		this.setState(state => ({ pageNumber: this.state.pageNumber + 1 }));
  }
  
  zoomInFull = () => {
	if(this.state.fullWidth<=700)
		this.setState(state => ({ fullWidth: this.state.fullWidth + 100 }));
  }
  zoomOutFull = () => {
	if(this.state.fullWidth>=200)
		this.setState(state => ({ fullWidth: this.state.fullWidth - 100 }));
  }
  
  zoomOutMobile = () => {
	if(this.state.mobileWidth>=100)
		this.setState(state => ({ mobileWidth: this.state.mobileWidth - 50 }));
  }
  zoomInMobile = () => {
	if(this.state.mobileWidth<=350)
		this.setState(state => ({ mobileWidth: this.state.mobileWidth + 50 }));
  }

  download = () => {
	fetch("https://cors-anywhere.herokuapp.com/" + this.props.user.pdf,{
	})
	  .then((response) => {
		return response.blob();
	  })
	  .then((bb) => {
		console.log(bb);
		var data = new Blob([bb], {type: 'application/pdf'});
		var pdfURL = window.URL.createObjectURL(data);
		var tempLink = document.createElement('a');
		tempLink.href = pdfURL;
		tempLink.setAttribute('download', this.props.match.params.id+".pdf");
		document.body.appendChild(tempLink);
		tempLink.click();
      })
  }


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
						<Button color='orange' onClick={this.download}>Download as PDF</Button>
					</Grid.Row>
					<Grid.Row centered>
                          <div>
							<Button icon disabled={this.state.mobileWidth<=50} onClick={this.zoomOutMobile}>
							  <Icon name='zoom-out' />
							</Button>
							<Button icon disabled={this.state.mobileWidth>=400} onClick={this.zoomInMobile}>
							  <Icon name='zoom-in' />
							</Button>
						  </div>
                    </Grid.Row>
                    <Grid.Row centered>
                          <div>
							<Button icon disabled={this.state.pageNumber<=1} onClick={this.goToPrevPage}>
							  <Icon name='left arrow' />
							</Button>
							<Button icon disabled={this.state.pageNumber>=this.state.numPages} onClick={this.goToNextPage}>
							  <Icon name='right arrow' />
							</Button>
						  </div>
                    </Grid.Row>
					<Grid.Row centered>
						Page {this.state.pageNumber} of {this.state.numPages}
					</Grid.Row>
                  </Grid>
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
						  <div style={{border:"1px solid black",width:this.state.mobileWidth+2,marginBottom:"10px",marginTop:"10px"}}>
                            <Page pageNumber={this.state.pageNumber} width={this.state.mobileWidth} />
						  </div>
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
				  <Grid>
				    <Grid.Row centered>
						<Button color='orange' onClick={this.download}>Download as PDF</Button>
					</Grid.Row>
					<Grid.Row centered>
                          <div>
							<Button icon disabled={this.state.fullWidth<=100} onClick={this.zoomOutFull}>
							  <Icon name='zoom-out' />
							</Button>
							<Button icon disabled={this.state.fullWidth>=800} onClick={this.zoomInFull}>
							  <Icon name='zoom-in' />
							</Button>
						  </div>
                    </Grid.Row>
                    <Grid.Row centered>
                          <div>
							<Button icon disabled={this.state.pageNumber<=1} onClick={this.goToPrevPage}>
							  <Icon name='left arrow' />
							</Button>
							<Button icon disabled={this.state.pageNumber>=this.state.numPages} onClick={this.goToNextPage}>
							  <Icon name='right arrow' />
							</Button>
						  </div>
                    </Grid.Row>
					<Grid.Row centered>
						Page {this.state.pageNumber} of {this.state.numPages}
					</Grid.Row>	  
                  </Grid>
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
						  <div style={{border:"1px solid black",width:this.state.fullWidth+2}}>
                           <Page pageNumber={this.state.pageNumber} width={this.state.fullWidth} />
						  </div>
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
