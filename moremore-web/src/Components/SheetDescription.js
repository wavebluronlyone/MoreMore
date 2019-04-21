import React from "react";
import { Tab } from "semantic-ui-react";

const SheetDescription = props => (
  <Tab
    panes={[
      {
        menuItem: "รายละเอียดของชีท",
        render: () => <Tab.Pane>{props.sheetDetail}</Tab.Pane>
      }
    ]}
  />
);

export default SheetDescription;
