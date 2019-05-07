import React from "react";
import { Segment, Container, Grid, Image ,Button} from "semantic-ui-react";
import cover from "../Image/cvphoto.jpg";
const Sheeter = () => (
  <Segment
    style={{
      minHeight: "38em"
    }}
  >
    <div style={{ display: "inline" }}>
      <br />
	  <br />
      <Container style={{ fontFamily: "Prompt", fontSize: "1.3em" }}>
        <Grid stackable>
          <Grid.Row>
            <Grid.Column width={3} />
            <Grid.Column width={10}>
			  <h1 style={{ fontFamily: "Prompt" }} align="center">
				สมัครนักทำชีทสรุป
			  </h1>
			  <Image src={cover} href="https://goo.gl/forms/RzTNxtfqaWRY5h1R2" target="_blank" style={{marginTop:"10px"}}/>
			  <div style={{marginTop:"20px"}}>
				  <Button
						href="https://drive.google.com/file/d/1wpE_8T83aAk8LmX7sFzd10HhPqWYDyn-/view"
						target="_blank"
						style={{
						  fontFamily: "Prompt",
						  fontSize: "1.2em",
						  backgroundColor: "#fbb900",
						  color: "#000000",
						  width:"100%"
						}}
					  >
					  ข้อตกลงในการขาย
				  </Button>
			  </div>
			  <div style={{marginTop:"20px",marginBottom:"20px"}}>
				  <Button
						href="https://drive.google.com/file/d/1gra6-0GOb4S-Sbybjegle1F7-aJgRZDf/view"
						target="_blank"
						style={{
						  fontFamily: "Prompt",
						  fontSize: "1.2em",
						  backgroundColor: "#fbb900",
						  color: "#000000",
						  width:"100%"
						}}
					  >การส่งชีทและรายได้
				  </Button>
			  </div>
			  
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </div>
  </Segment>
);

export default Sheeter;
