import React from "react";
import { Carousel } from "react-bootstrap";

const Slide = () => (
  <div className="container">
    <Carousel>
      <Carousel.Item>
        <img
          width={400}
          height={400}
          alt="400x400"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBvTDkeo3uYY6k608BgekzTD8BXyx8HsSQLnjLW-HCWcHx2G_OJg"
        />
        <Carousel.Caption />
      </Carousel.Item>
      <Carousel.Item>
        <img
          width={400}
          height={400}
          alt="400x400"
          src="https://www.walldevil.com/wallpapers/a91/paper-sheet-texture.jpg"
        />
        <Carousel.Caption />
      </Carousel.Item>
      <Carousel.Item>
        <img
          width={400}
          height={400}
          alt="400x400"
          src="https://st.hzcdn.com/simgs/68e1c45d0209b440_4-6429/home-design.jpg"
        />
        <Carousel.Caption />
      </Carousel.Item>
    </Carousel>
  </div>
);

export default Slide;
