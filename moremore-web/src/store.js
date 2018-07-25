import { Store } from './Utils/redux-warper';

import { reducer as OrderList } from './Features/Orderlist/reducer';


export const store = new Store({
    OrderList: OrderList.combine(),
});
