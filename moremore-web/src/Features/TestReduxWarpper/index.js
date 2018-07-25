import React, { Component } from 'react';
import { store } from '../../store';
import ItemList from '../../Components/itemList';

class Orderlist extends Component {
  componentDidMount() {
    store.update('FETCH_ORDERLISTS');
    this.unsubscribe = store.subscribe(() => {
      this.forceUpdate();
    });
    
  }

  render() {
    const state = store.state().OrderList;
    const Orders = state.Orders;
    
    return (
        <div>
          <ItemList Items={Orders}/>
        
        </div>
    );
  }
}

export default Orderlist;
