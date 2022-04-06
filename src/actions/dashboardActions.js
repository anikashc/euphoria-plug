export const setToken = (value) => (dispatch) => {
    console.log('setToken',value)
    dispatch({
        type: 'SET_TOKEN',
        payload: value
    })
    localStorage.setItem("token", value);
}

export const setProfile = (value) => (dispatch) => {
    dispatch({
        type: 'SET_PROFILE',
        payload: value
    })
    console.log('profile',value)
}

export const setProfiles = (value) => (dispatch)=> {
    dispatch({
        type: 'SET_PROFILES',
        payload: value
    })
    console.log('profiles',value)
}

export const setFavourites = (value) => (dispatch) => {
    dispatch({
        type: 'SET_FAVOURITES',
        payload: value
    })
    console.log('favourites',value)
}

export const setLogout = () => (dispatch) => {
    localStorage.removeItem("token");
    dispatch({
        type: 'SET_TOKEN_RESET'
    })
    dispatch({
        type: 'SET_PROFILE_RESET'
    })
    dispatch({
        type: 'SET_PROFILES_RESET'
    })
    

}