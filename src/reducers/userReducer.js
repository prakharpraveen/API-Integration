export default function (state = { users: [], userToken:'', isFetchingUser: true}, action) {
    switch (action.type) {
        case "LOGIN_USER":
            return { ...state, userToken: action.payload };
        
        case "USER_IS_FETCHING": 
            return {...state, isFetchingUser: action.payload}

        case "USERS":
            return { ...state, users: action.payload, isFetchingUser: false }

        case "DELETE_USER":
            return { ...state, users: state.users.filter(user => !action.payload.includes(user._id) ) }

        case "ADD_USER":
            return { ...state, users: [...state.users, action.payload] }
        default:
            return state;
    }
}