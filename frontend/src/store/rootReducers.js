import authReducer from "./Reducers/authReducer";

import gunReducer from "./Reducers/gunReducer";
import cardReducer from "./Reducers/CardReducer";
import orderReducer from "./Reducers/orderReducer";
const rootReducer = {
  auth: authReducer,
  guns: gunReducer,
  card: cardReducer,
  order: orderReducer,
};

export default rootReducer;
