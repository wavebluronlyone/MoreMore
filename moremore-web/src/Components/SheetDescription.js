import React from "react";
import { Tab } from "semantic-ui-react";

const SheetDescription = props => (
  <Tab
    panes={[
      {
        menuItem: "รายละเอียดของชีท",
        render: () => (
          <Tab.Pane
            style={{
              fontFamily: "Prompt"
            }}
          >
            {props.sheetDetail}
          </Tab.Pane>
        )
      }
    ]}
  />
);

export default SheetDescription;
