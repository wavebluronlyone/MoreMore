import React from "react";
import { Carousel } from "react-bootstrap";
import { Image } from "semantic-ui-react";

const Slide = props => (
  <div>
    <Carousel>
      {props.multipleImageList.map(image => {
        return (
          <Carousel.Item>
            <Image width="100%" height="auto" src={image} />
            <Carousel.Caption />
          </Carousel.Item>
        );
      })}
    </Carousel>
  </div>
);

export default Slide;
