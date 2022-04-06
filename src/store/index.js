import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from  'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    setTokenReducer,
    setProfileReducer,
    setProfilesReducer,
    setLogoutReducer,
    setFavouritesReducer
} from '../reducers/dashboardReducers'

const reducer = combineReducers({
    token: setTokenReducer,
    profile: setProfileReducer,
    profiles: setProfilesReducer,
    logout: setLogoutReducer,
    favourites: setFavouritesReducer
})

const initialState = {
    token: localStorage.getItem('token') || null,
    profile: {},
    profiles: [],
    logout: false,
    favourites: []
}


const middleware = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;