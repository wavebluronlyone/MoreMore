import React, { Component } from "react";
import { Segment, Container, Grid } from "semantic-ui-react";
import { Document, Page } from "react-pdf";
import about from "../Image/about.pdf";

class About extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      height: window.innerHeight, 
      width: window.innerWidth,
	  pdfwidth:1,
    };
	this.myPDF = React.createRef();
  }
  
  updateDimensions = () => {
    this.setState({
      height: window.innerHeight, 
      width: window.innerWidth,
	  pdfwidth:this.myPDF.current.offsetWidth,
    });
  }
  
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
	this.updateDimensions();
  }
  
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
  
  render() {
	return (
		  <Segment
			style={{
			  minHeight: "38em"
			}}
		  >
			<br />
			<br />
			<Container style={{ fontFamily: "Prompt", fontSize: "1.3em" }}>
			  <Grid stackable>
				<Grid.Row>
				  <Grid.Column width={3} />
				  <Grid.Column width={11}>
				    <h1 style={{ fontFamily: "Prompt"}} align="center">
					  About Us | เกี่ยวกับเรา
					</h1>
					<br />
				    <div ref={this.myPDF} style={{width:"100%"}}>
						<Document
								  file={
									about
								  }
								>
								<Page pageNumber={1} width={this.state.pdfwidth}/>
						</Document>
					</div>
					<br />
				  </Grid.Column>
				</Grid.Row>
			  </Grid>
			  {/* <br /> */}
			  {/* <li>
				<p align="left">สมัครเป็นนักทำชีทสรุป</p>
			  </li>
			  <li>
				<p align="left">facebook page</p>
			  </li>
			  <li>
				<p align="left">email</p>
			  </li> */}
			</Container>
		  </Segment>
		);
  }
}

export default About;
