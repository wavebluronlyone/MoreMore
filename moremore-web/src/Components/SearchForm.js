import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  findSheetDataWithPaginationFromSearch,
  findSheetDataWithPagination
} from "../Actions/StockActions";
import { Input, Grid, Container, Responsive } from "semantic-ui-react";

const FieldInput = ({ type, placeholder, input, ...props }) => {
  if (input.value === "") {
    props.meta.dispatch(findSheetDataWithPagination(1, 5));
  } else {
    props.meta.dispatch(
      findSheetDataWithPaginationFromSearch(1, 5, input.value)
    );
    props.meta.dispatch({ type: "input_change", input: input.value });
  }

  return (
    <div>
      <Responsive maxWidth={800}>
        <Input
          fluid
          style={{
            borderColor: "#ffc900"
          }}
          icon="search"
          type={type}
          placeholder={placeholder}
          value={input.value}
          onChange={input.onChange}
        />
      </Responsive>

      <Responsive minWidth={801}>
        <Input
          style={{
            width: "50em",
            borderColor: "#ffc900"
          }}
          icon="search"
          type={type}
          placeholder={placeholder}
          value={input.value}
          onChange={input.onChange}
        />
      </Responsive>
    </div>
  );
};

let SearchForm = () => {
  return (
    <div>
      <Responsive maxWidth={800}>
        <Container>
          <Grid unstackable>
            <Grid.Row>
              <Grid.Column>
                <Field
                  name="sheetName"
                  type="name"
                  component={FieldInput}
                  placeholder="รหัสวิชา/ชื่อผู้เขียน"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Responsive>

      <Responsive minWidth={801}>
        <Container>
          <Grid unstackable>
            <Grid.Row>
              <Grid.Column width={3} />
              <Grid.Column>
                <Field
                  name="sheetName"
                  type="name"
                  component={FieldInput}
                  placeholder="รหัสวิชา/ชื่อผู้เขียน"
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Responsive>
    </div>
  );
};

SearchForm = reduxForm({
  form: "search"
})(SearchForm);

export default SearchForm;
