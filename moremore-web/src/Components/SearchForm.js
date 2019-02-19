import React from "react";
import { Grid, Row, Col, FormControl, Button } from "react-bootstrap";
import { Field, reduxForm } from "redux-form";
import {
  findSheetDataWithPaginationFromSearch,
  findSheetDataWithPagination
} from "../Actions/StockActions";

const FieldInput = ({ type, placeholder, input, ...props }) => {
  if (input.value === "") {
    props.meta.dispatch(findSheetDataWithPagination(1, 5));
  } else {
    props.meta.dispatch(findSheetDataWithPaginationFromSearch(1, 5, input.value));
    props.meta.dispatch({ type: "input_change", input: input.value });
  }

  return (
    <FormControl
      type={type}
      placeholder={placeholder}
      value={input.value}
      onChange={input.onChange}
    />
  );
};

let SearchForm = () => {
  return (
    <div className="container">
      <Grid>
        <Row>
          <Col sm={2} />
          <Col sm={6}>
            <Field
              name="sheetName"
              type="name"
              component={FieldInput}
              placeholder="รหัสวิชา/ชื่อผู้เขียน"
            />
          </Col>
          <Col sm={1}>
            <Button type="submit">ค้นหา</Button>
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

SearchForm = reduxForm({
  form: "search"
})(SearchForm);

export default SearchForm;
