import React from "react";
import { Grid, Row, Col, Image } from "react-bootstrap";

const About = () => (
  <div>
    <br />
    <br />
    <br />
    <h1 align="left">about us | เกี่ยวกับตัวเรา</h1>
    <br />
    <Grid>
      <Row>
        <Col sm={12}>
          <Image
            src="https://library.tu.ac.th/sites/default/files/styles/punsarn_gallery_thumbnail_200_x200_upscaling_allowed/public/2017-01/TULIBS-tu-resources.png?itok=KhH0ZjRo"
            rounded
          />
        </Col>
      </Row>
    </Grid>
    <br/>
    <Grid>
      <Row>
        <Col sm={12}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do <br/>
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad <br/>
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut <br/>
          aliquip ex ea commodo consequat. Duis aute irure dolor in <br/>
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla <br/>
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in <br/>
          culpa qui officia deserunt mollit anim id est laborum.
        </Col>
      </Row>
    </Grid>
    <br/>
    <li><p align="left">สมัครเป็นนักทำชีทสรุป</p></li>
    <li><p align="left">facebook page</p></li>
    <li><p align="left">email</p></li>
  </div>
);

export default About;
