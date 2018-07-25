import React, { Component } from 'react';
import { Card, CardBody } from 'reactstrap';

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    console.log(this.props.Items);
    this.setState({
      items: this.props.Items,
    });
  }

  render() {
    return (
      <React.Fragment>
        {
                this.state.items.map(item => (
                  <Card>
                    <CardBody>
                      {item}
                    </CardBody>
                  </Card>
                ))
            }

      </React.Fragment>
    );
  }
}
export default ItemList;
