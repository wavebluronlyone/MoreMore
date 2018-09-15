import React from "react";
import { Table, Button } from "react-bootstrap";

const TableView = (props) => (
  <div className="container">
    <Table responsive>
      <thead />
      <tbody>
        <tr>
          <td width="5%">1.</td>
          <td width="30%" align="left">
            {props.sheetName}
          </td>
          <td width="5%">
            <a href={props.pdfFile}>อ่าน</a>
          </td>
        </tr>
      </tbody>
    </Table>
  </div>
);

export default TableView;
