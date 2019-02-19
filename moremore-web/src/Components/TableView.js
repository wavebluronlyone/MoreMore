import React from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const TableView = props => (
  <div className="container">
    <Table responsive>
      <thead />
      <tbody>
        {props.sheetPdfList.data.map((sheet, index) => {
          return (
            <tr>
              <td width="5%">{index + 1}</td>
              <td width="30%" align="left">
                {sheet.name}
              </td>
              <td width="5%">
                <Link to={"/ReadSheet/" + sheet.name}>อ่าน</Link>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  </div>
);

export default TableView;
