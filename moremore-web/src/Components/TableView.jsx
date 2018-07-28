import React from "react";
import { Table, Button } from "react-bootstrap";

const TableView = () => (
  <div className="container">
    <Table responsive>
      <thead />
      <tbody>
        <tr>
          <td width="5%">1.</td>
          <td width="30%" align="left">
            TU101 รวมไฟนอล by Adriama
          </td>
          <td width="5%">
            <Button>อ่าน</Button>
          </td>
          <td width="5%">
            <Button>พิมพ์</Button>
          </td>
        </tr>
        <tr>
          <td width="5%">2.</td>
          <td width="30%" align="left">
            EG216 by Minniemore
          </td>
          <td width="5%">
            <Button>อ่าน</Button>
          </td>
          <td width="5%">
            <Button>พิมพ์</Button>
          </td>
        </tr>
      </tbody>
    </Table>
  </div>
);

export default TableView;
