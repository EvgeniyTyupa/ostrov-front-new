import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import multi from 'redux-multi';
import commonReducer from './commonReducer';
import itemsReducer from './itemsReducer';
import brandsReducer from './brandsReducer';
import categoryReducer from './categoryReducer';
import tagsReducer from './tagsReducer';
import userReducer from './userReducer';
import newsReducer from './newsReducer';
import actionsReducer from './actionsReducer';
import commentsReducer from './commentsReducer';
import cartReducer from './cartReducer';
import ordersReducer from './ordersReducer';
import promocodeReducer from './promocodeReducer';

let reducers = combineReducers({
    common: commonReducer,
    items: itemsReducer,
    brands: brandsReducer,
    categories: categoryReducer,
    tags: tagsReducer,
    user: userReducer,
    news: newsReducer,
    actions: actionsReducer,
    comments: commentsReducer,
    cart: cartReducer,
    orders: ordersReducer,
    promocodes: promocodeReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleWare, multi))

window.store = store

export default store