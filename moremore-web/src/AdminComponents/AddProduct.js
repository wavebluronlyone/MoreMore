import React, { Component } from "react";
import {
  createPdf,
  createImage,
  createProductText,
  createSubImage
} from "../Actions/AdminActions";
import { connect } from "react-redux";
import {
  Form,
  TextArea,
  Input,
  Container,
  Image,
  Button
} from "semantic-ui-react";

const mapStatetoProps = state => {
  return {
    admin: state.admin
  };
};

const mapDispatchtoProps = dispatch => ({
  createPdf: (pdf, sheetName) => {
    dispatch(createPdf(pdf, sheetName));
  },
  createImage: (sheetImage, sheetName) => {
    dispatch(createImage(sheetImage, sheetName));
  }
});

class AddProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sheetName: "",
      sheetPdf: "",
      sheetImage: "",
      sheetSubImage: "",
      price: 0,
      sheetHiLight: "",
      sheetProductDescription: "",
      profile: "",
      urlImage: "",
      urlSubImage: []
    };
    this.handleSheetNameOnchange = this.handleSheetNameOnchange.bind(this);
    this.handleSheetPdfOnchange = this.handleSheetPdfOnchange.bind(this);
    this.handleSheetImageOnchange = this.handleSheetImageOnchange.bind(this);
    this.handleSheetSubImageOnchange = this.handleSheetSubImageOnchange.bind(
      this
    );
    this.handlePriceOnchange = this.handlePriceOnchange.bind(this);
    this.handleSheetHiLightOnchange = this.handleSheetHiLightOnchange.bind(
      this
    );
    this.handleSheetProductDescriptionOnchange = this.handleSheetProductDescriptionOnchange.bind(
      this
    );
    this.handleProfileOnchange = this.handleProfileOnchange.bind(this);
  }
  handleSheetNameOnchange(event) {
    this.setState({ sheetName: event.target.value });
  }
  handleSheetPdfOnchange(event) {
    this.setState({ sheetPdf: event.target.files });
    console.log(event.target.files[0]);
  }
  handleSheetImageOnchange(event) {
    this.setState({ urlImage: "" });
    let url = URL.createObjectURL(event.target.files[0]);
    this.setState({ sheetImage: event.target.files, urlImage: url });
  }
  handleSheetSubImageOnchange(event) {
    this.setState({ urlSubImage: [] });
    const data = [];
    for (let i = 0; i < event.target.files.length; i++) {
      data[i] = { image: URL.createObjectURL(event.target.files[i]) };
    }
    this.setState({ sheetSubImage: event.target.files, urlSubImage: data });
  }
  handlePriceOnchange(event) {
    this.setState({ price: event.target.value });
  }
  handleSheetHiLightOnchange(event) {
    this.setState({ sheetHiLight: event.target.value });
  }
  handleSheetProductDescriptionOnchange(event) {
    this.setState({ sheetProductDescription: event.target.value });
  }
  handleProfileOnchange(event) {
    this.setState({ profile: event.target.value });
  }
  addProduct() {
    this.props.createImage(this.state.sheetImage[0], this.state.sheetName);
    createSubImage(this.state.sheetSubImage, this.state.sheetName);
    this.props.createPdf(this.state.sheetPdf[0], this.state.sheetName);
    createProductText(
      this.state.sheetName,
      this.state.price,
      this.state.sheetHiLight,
      this.state.sheetProductDescription,
      this.state.profile
    );
  }
  componentWillUnmount() {
    this.setState({
      sheetName: "",
      sheetPdf: "",
      sheetImage: "",
      sheetSubImage: "",
      price: 0,
      sheetHiLight: "",
      sheetProductDescription: "",
      profile: "",
      urlImage: "",
      urlSubImage: []
    });
  }
  render() {
    return (
      <Container style={{ fontFamily: "Prompt" }}>
        <br />
        <Form>
          <Form.Field>
            <label>ชื่อสินค้า</label>
            <Input
              style={{
                width: "25em",
                borderColor: "#ffc900"
              }}
              type="text"
              placeholder="กรุณากรอกชื่อสินค้า"
              onChange={this.handleSheetNameOnchange}
            />
            <br />
          </Form.Field>

          <Form.Field>
            <label>ไฟล์</label>
            <Input
              style={{
                width: "25em",
                borderColor: "#ffc900"
              }}
              accept=".pdf"
              type="file"
              onChange={this.handleSheetPdfOnchange}
            />
            <br />
          </Form.Field>

          <Form.Field>
            <label>รูปภาพหน้าปก</label>
            <Form.Input
              style={{
                width: "25em",
                borderColor: "#ffc900"
              }}
              accept=".jpg"
              type="file"
              onChange={this.handleSheetImageOnchange}
            />
            {this.state.urlImage !== "" ? (
              <Image width="100px" height="100px" src={this.state.urlImage} />
            ) : null}
          </Form.Field>

          <Form.Field>
            <label>รูปภาพประกอบ</label>
            <Form.Input
              style={{
                width: "25em",
                borderColor: "#ffc900"
              }}
              accept=".jpg"
              type="file"
              onChange={this.handleSheetSubImageOnchange}
              multiple
            />
            {this.state.urlSubImage.length > 0
              ? this.state.urlSubImage.map(res => {
                  return <Image width="100px" height="100px" src={res.image} />;
                })
              : null}
          </Form.Field>

          <Form.Field>
            <label>ราคา</label>
            <Form.Input
              style={{
                width: "25em",
                borderColor: "#ffc900"
              }}
              type="text"
              placeholder="กรุณากรอกราคา"
              onChange={this.handlePriceOnchange}
            />
          </Form.Field>

          <Form.Field>
            <label>รายละเอียดสินค้าโดยย่อ</label>
            <TextArea
              placeholder="กรุณากรอกรายละเอียดสินค้าโดยย่อ"
              onChange={this.handleSheetHiLightOnchange}
              style={{
                width: "40em",
                height: "10em"
              }}
            />
          </Form.Field>

          <Form.Field>
            <label>รายละเอียดสินค้าโดยละเอียด</label>
            <TextArea
              placeholder="กรุณากรอกรายละเอียดสินค้า"
              onChange={this.handleSheetProductDescriptionOnchange}
              style={{
                width: "40em",
                height: "10em"
              }}
            />
          </Form.Field>

          <Form.Field>
            <label>ผู้อัพโหลด</label>
            <Form.Input
              style={{
                width: "25em",
                borderColor: "#ffc900"
              }}
              type="text"
              placeholder="กรุณากรอกผู้อัพโหลด"
              onChange={this.handleProfileOnchange}
            />
          </Form.Field>

          <Form.Field>
            <Button
              onClick={() => {
                this.addProduct();
              }}
            >
              เพิ่ม
            </Button>
          </Form.Field>
        </Form>
        <br />
        <br />
      </Container>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(AddProduct);
