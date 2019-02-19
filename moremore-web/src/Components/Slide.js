import React from "react";
import { Carousel } from "react-bootstrap";

const Slide = props => (
  <div className="container">
    <Carousel>
      {props.multipleImageList.map(image => {
        return (
          <Carousel.Item>
            <img width="300px" height="300px" alt="400x400" src={image} />
            <Carousel.Caption />
          </Carousel.Item>
        );
      })}
    </Carousel>
  </div>
);

export default Slide;
