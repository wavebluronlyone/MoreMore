import React from "react";
import Search from "../Components/Search";
import Slide from "../Components/Slide";
import CardView from "../Components/CardView";

const Home = () => (
  <div>
    <br />
    <br />
    <br />
    <h1>หาตัวช่วยในการสอบของคุณได้ที่นี่</h1>
    <br/>
    <Search/>
    <br/>
    <hr/>
    <Slide/>
    <hr/>
    <br/>
    <h1>Best Seller</h1>
    <CardView/>
  </div>
);

export default Home;
