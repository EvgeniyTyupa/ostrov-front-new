import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import multi from 'redux-multi';
import commonReducer from './commonReducer';
import itemsReducer from './itemsReducer';
import brandsReducer from './brandsReducer';
import categoryReducer from './categoryReducer';
import tagsReducer from './tagsReducer';
import userReducer from './userReducer';

let reducers = combineReducers({
    common: commonReducer,
    items: itemsReducer,
    brands: brandsReducer,
    categories: categoryReducer,
    tags: tagsReducer,
    user: userReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleWare, multi))

window.store = store

export default store