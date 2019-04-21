import React from "react";
import { Table } from "semantic-ui-react";
import { Link } from "react-router-dom";

const TableView = props => (
  <div className="container">
    <Table style={{ fontFamily: "Prompt" }}>
      <Table.Body>
        {props.sheetPdfList.data.map((sheet, index) => {
          return (
            <Table.Row>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell align="left">{sheet.name}</Table.Cell>
              <Table.Cell>
                <Link to={"/ReadSheet/" + sheet.name}>อ่าน</Link>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  </div>
);

export default TableView;
