import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Col,
  ControlLabel,
  Image,
  FormControl
} from "react-bootstrap";
import {
  createPdf,
  createImage,
  createProductText,
  createSubImage
} from "../Actions/AdminActions";
import { connect } from "react-redux";

const mapStatetoProps = state => {
  return {
    admin: state.admin
  };
};

const mapDispatchtoProps = dispatch => ({
  createPdf: (pdf, sheetName) => {
    dispatch(createPdf(pdf, sheetName));
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
    createImage(this.state.sheetImage[0], this.state.sheetName);
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
      <div>
        <Form>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              <p align="right">ชื่อสินค้า:</p>
            </Col>
            <Col sm={5}>
              <FormControl
                type="text"
                placeholder="กรุณากรอกชื่อสินค้า"
                onChange={this.handleSheetNameOnchange}
              />
            </Col>
          </FormGroup>

          <br />
          <br />

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              <p align="right">ไฟล์:</p>
            </Col>
            <Col sm={5}>
              <FormControl
                accept=".pdf"
                type="file"
                onChange={this.handleSheetPdfOnchange}
              />
            </Col>
          </FormGroup>

          <br />

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              <p align="right">รูปภาพหน้าปก:</p>
            </Col>
            <Col sm={5}>
              <FormControl
                accept=".jpg"
                type="file"
                onChange={this.handleSheetImageOnchange}
              />
            </Col>
            <br />
            <br />
            <Col sm={5}>
              {this.state.urlImage !== "" ? (
                <Image width="100px" height="100px" src={this.state.urlImage} />
              ) : null}
            </Col>
          </FormGroup>

          <br />
          <br />
          <br />
          <br />
          <br />

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              <p align="right">รูปภาพประกอบ:</p>
            </Col>
            <Col sm={5}>
              <FormControl
                accept=".jpg"
                type="file"
                onChange={this.handleSheetSubImageOnchange}
                multiple
              />
              {this.state.urlSubImage.length > 0
                ? this.state.urlSubImage.map(res => {
                    return (
                      <Col sm={2}>
                        <Image width="100px" height="100px" src={res.image} />
                      </Col>
                    );
                  })
                : null}
            </Col>
          </FormGroup>

          <br />
          <br />
          <br />
          <br />
          <br />
          <br />

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              <p align="right">ราคา:</p>
            </Col>
            <Col sm={5}>
              <FormControl
                type="text"
                placeholder="กรุณากรอกราคา"
                onChange={this.handlePriceOnchange}
              />
            </Col>
          </FormGroup>

          <br />
          <br />

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              <p align="right">รายละเอียดสินค้าโดยย่อ:</p>
            </Col>
            <Col sm={5}>
              <textarea
                placeholder="กรุณากรอกรายละเอียดสินค้าโดยย่อ"
                onChange={this.handleSheetHiLightOnchange}
                cols={80}
                rows={3}
              />
            </Col>
          </FormGroup>

          <br />
          <br />
          <br />
          <br />

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              <p align="right">รายละเอียดสินค้าโดยละเอียด:</p>
            </Col>
            <Col sm={5}>
              <textarea
                placeholder="กรุณากรอกรายละเอียดสินค้า"
                onChange={this.handleSheetProductDescriptionOnchange}
                cols={80}
                rows={3}
              />
            </Col>
          </FormGroup>

          <br />
          <br />
          <br />
          <br />

          <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
              <p align="right">ผู้อัพโหลด:</p>
            </Col>
            <Col sm={5}>
              <FormControl
                type="text"
                placeholder="กรุณากรอกผู้อัพโหลด"
                onChange={this.handleProfileOnchange}
              />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <br />
              <Button
                onClick={() => {
                  this.addProduct();
                }}
              >
                เพิ่ม
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(AddProduct);
