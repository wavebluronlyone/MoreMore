import React from "react";
import { Table } from "react-bootstrap";

const TableView = props => (
  <div className="container">
    <Table responsive>
      <thead />
      <tbody>
        {props.list.data.map((res, index) => {
          return (
            <tr>
              <td width="5%">{index + 1}</td>
              <td width="30%" align="left">
                {res.name}
              </td>
              <td width="5%">
                <a href={res.pdf}>อ่าน</a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  </div>
);

export default TableView;
