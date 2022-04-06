export const setTokenReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_TOKEN':
            return action.payload;
        case 'SET_TOKEN_RESET':
            return null;
        default:
            return state;
    }
}

export const setProfileReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_PROFILE':
            return action.payload;
        case 'SET_PROFILE_RESET':
            return {};
        default:
            return state;
    }
}


export const setProfilesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_PROFILES':
            return action.payload;
        case 'SET_PROFILES_RESET':
            return []
        default:
            return state;
    }
}

export const setFavouritesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FAVOURITES':
            return action.payload;
        case 'SET_FAVOURITES_RESET':
            return []
        default:
            return state;
    }
}
